using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Windows.Forms;
using Microsoft.Office.Interop.Outlook;
using Newtonsoft.Json;
using System.Runtime.InteropServices;

namespace PhishingScannerOutlookAddin
{

    public partial class ThisAddIn
    {
        private List<Items> monitoredItems = new List<Items>();
        public bool ScanEnabled = true;
        private readonly string apiUrl = "http://209.38.120.178:8000/predict";
        public int totalScanned = 0;
        public int totalPhishing = 0;
        public int totalClean = 0;


        private void ThisAddIn_Startup(object sender, EventArgs e)
        {
            StartMonitoringAllInboxes();
        }

        private void ThisAddIn_Shutdown(object sender, EventArgs e)
        {
            StopMonitoringAllInboxes();
        }
        private bool IsAlreadyScanned(MailItem mail)
        {
            try
            {
                UserProperties props = mail.UserProperties;
                UserProperty scannedProp = props.Find("Scanned");
                if (scannedProp != null && scannedProp.Value.ToString() == "Yes")
                {
                    return true;
                }
            }
            catch { }
            return false;
        }

        private List<MAPIFolder> GetAllInboxFolders()
        {
            List<MAPIFolder> inboxFolders = new List<MAPIFolder>();

            foreach (Account account in Application.Session.Accounts)
            {
                try
                {
                    Folder root = account.DeliveryStore.GetRootFolder() as Folder;
                    foreach (Folder folder in root.Folders)
                    {
                        if (folder.Name.Equals("Inbox", StringComparison.OrdinalIgnoreCase))
                        {
                            inboxFolders.Add(folder);
                        }
                    }
                }
                catch (System.Exception ex)
                {
                    MessageBox.Show("⚠️ Error accessing account folders: " + ex.Message);
                }
            }

            return inboxFolders;
        }

        private void StartMonitoringAllInboxes()
        {
            foreach (MAPIFolder inbox in GetAllInboxFolders())
            {
                try
                {
                    Items items = inbox.Items;
                    items.ItemAdd += new ItemsEvents_ItemAddEventHandler(ItemAddedHandler);
                    monitoredItems.Add(items);
                }
                catch (System.Exception ex)
                {
                    MessageBox.Show("⚠️ Failed to monitor inbox: " + ex.Message);
                }
            }
        }

        private void StopMonitoringAllInboxes()
        {
            foreach (var items in monitoredItems)
            {
                try
                {
                    items.ItemAdd -= new ItemsEvents_ItemAddEventHandler(ItemAddedHandler);
                }
                catch { }
            }
            monitoredItems.Clear();
        }

        private void ItemAddedHandler(object item)
        {
            if (!ScanEnabled) return;

            MailItem mail = item as MailItem;
            if (mail != null)
            {
                ScanEmail(mail);
            }
        }
        public async void ScanEmail(MailItem mail)
        {
            try
            {
                if (IsAlreadyScanned(mail))
                {
                    return;
                }
                string subject = mail.Subject ?? "";
                string body = mail.Body ?? "";
                string sender = mail.SenderEmailAddress ?? "";
                string url = ExtractFirstUrl(body);

                var payload = new
                {
                    subject = subject,
                    body = body,
                    sender = sender,
                    url = url
                };

                string json = JsonConvert.SerializeObject(payload);
                using (HttpClient client = new HttpClient())
                {
                    var content = new StringContent(json, Encoding.UTF8, "application/json");
                    HttpResponseMessage response = await client.PostAsync(apiUrl, content);
                    string responseString = await response.Content.ReadAsStringAsync();

                    if (response.IsSuccessStatusCode)
                    {
                        dynamic result = JsonConvert.DeserializeObject(responseString);
                        int emailPred = result.email_prediction;
                        double emailConf = result.email_confidence;

                        // ✅ Mark as scanned always
                        MarkAsScanned(mail);

                        if (emailPred == 1 && emailConf > 0.7)
                        {
                            mail.Categories = "🚨 Phishing"; // visible red tag
                            MoveToPhishingFolder(mail);
                        }
                        else
                        {
                            mail.Categories = "✅ Clean"; // visible green tag
                        }

                        mail.Save();
                    }
                    else
                    {
                        MessageBox.Show("❌ API Error: " + responseString);
                    }
                }
            }
            catch (System.Exception ex)
            {
                MessageBox.Show("⚠️ Error during phishing check: " + ex.Message);
            }
        }

        public void ScanAllInboxEmails()
        {
            try
            {
                foreach (MAPIFolder inbox in GetAllInboxFolders())
                {
                    foreach (object item in inbox.Items)
                    {
                        if (item is MailItem mail)
                        {
                            ScanEmail(mail);
                        }
                    }
                }
            }
            catch (System.Exception ex)
            {
                MessageBox.Show("⚠️ Error scanning all inbox emails: " + ex.Message);
            }
        }

        public void ScanSelectedEmail()
        {
            try
            {
                Selection selection = Application.ActiveExplorer().Selection;
                if (selection.Count > 0 && selection[1] is MailItem mail)
                {
                    ScanEmail(mail);
                }
                else
                {
                    MessageBox.Show("❗ No email selected.");
                }
            }
            catch (System.Exception ex)
            {
                MessageBox.Show("⚠️ Error scanning selected email: " + ex.Message);
            }
        }

        private void MoveToPhishingFolder(MailItem mail)
        {
            try
            {
                MAPIFolder parent = mail.Parent as MAPIFolder;
                if (parent == null) return;

                Folders folders = parent.Parent is Folders
                    ? (Folders)parent.Parent
                    : ((MAPIFolder)parent.Parent).Folders;

                MAPIFolder phishingFolder = null;
                try
                {
                    phishingFolder = folders["Phishing"];
                }
                catch
                {
                    phishingFolder = folders.Add("Phishing", OlDefaultFolders.olFolderInbox);
                }

                mail.Move(phishingFolder);
            }
            catch (System.Exception ex)
            {
                MessageBox.Show("⚠️ Error moving email to Phishing folder: " + ex.Message);
            }
        }

        private string ExtractFirstUrl(string body)
        {
            try
            {
                Match match = Regex.Match(body, @"http[s]?://[^\s<>""']+");
                return match.Success ? match.Value : "";
            }
            catch
            {
                return "";
            }
        }
        private void MarkAsScanned(MailItem mail)
        {
            try
            {
                UserProperties props = mail.UserProperties;
                UserProperty scannedProp = props.Find("Scanned");
                if (scannedProp == null)
                {
                    scannedProp = props.Add("Scanned", OlUserPropertyType.olText, false, Type.Missing);
                }
                scannedProp.Value = "Yes";
                mail.Save();
            }
            catch { }
        }

        #region VSTO generated code

        private void InternalStartup()
        {
            this.Startup += new EventHandler(ThisAddIn_Startup);
            this.Shutdown += new EventHandler(ThisAddIn_Shutdown);
        }

        #endregion
    }
}
