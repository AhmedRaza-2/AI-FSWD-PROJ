using Microsoft.Office.Tools.Ribbon;
using System.Windows.Forms;

namespace PhishingScannerOutlookAddin
{
    public partial class Ribbon1
    {
        private void Ribbon1_Load(object sender, RibbonUIEventArgs e)
        {
            toggleScanButton.Checked = true;
        }

        private void toggleScanButton_Click(object sender, RibbonControlEventArgs e)
        {
            Globals.ThisAddIn.ScanEnabled = toggleScanButton.Checked;
            string status = toggleScanButton.Checked ? "enabled" : "disabled";
            MessageBox.Show($"🔄 Phishing scan is now {status}.");
        }
        private void scanAllButton_Click(object sender, RibbonControlEventArgs e)
        {
            Globals.ThisAddIn.ScanAllInboxEmails();
        }

        private void scanSelectedButton_Click(object sender, RibbonControlEventArgs e)
        {
            Globals.ThisAddIn.ScanSelectedEmail();
        }
          }
}
