namespace PhishingScannerOutlookAddin
{
    partial class Ribbon1 : Microsoft.Office.Tools.Ribbon.RibbonBase
    {
        private System.ComponentModel.IContainer components = null;

        public Ribbon1()
            : base(Globals.Factory.GetRibbonFactory())
        {
            InitializeComponent();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing && components != null)
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Component Designer generated code

        private void InitializeComponent()
        {
            this.tab1 = this.Factory.CreateRibbonTab();
            this.group1 = this.Factory.CreateRibbonGroup();
            this.toggleScanButton = this.Factory.CreateRibbonToggleButton();
            this.scanAllButton = this.Factory.CreateRibbonButton();
            this.scanSelectedButton = this.Factory.CreateRibbonButton();
            this.reportPhishingButton = this.Factory.CreateRibbonButton();
            this.tab1.SuspendLayout();
            this.group1.SuspendLayout();
            this.SuspendLayout();
            // 
            // tab1
            // 
            this.tab1.ControlId.ControlIdType = Microsoft.Office.Tools.Ribbon.RibbonControlIdType.Office;
            this.tab1.Groups.Add(this.group1);
            this.tab1.Label = "Phishing Detector";
            this.tab1.Name = "tab1";
            // 
            // group1
            // 
            this.group1.Items.Add(this.toggleScanButton);
            this.group1.Items.Add(this.scanAllButton);
            this.group1.Items.Add(this.scanSelectedButton);
            this.group1.Items.Add(this.reportPhishingButton);
            this.group1.Label = "Scanner Controls";
            this.group1.Name = "group1";
            // 
            // toggleScanButton
            // 
            this.toggleScanButton.Label = "Start Scan";
            this.toggleScanButton.Name = "toggleScanButton";
            this.toggleScanButton.Click += new Microsoft.Office.Tools.Ribbon.RibbonControlEventHandler(this.toggleScanButton_Click);
            // 
            // scanAllButton
            // 
            this.scanAllButton.Label = "Scan All Inbox";
            this.scanAllButton.Name = "scanAllButton";
            this.scanAllButton.Click += new Microsoft.Office.Tools.Ribbon.RibbonControlEventHandler(this.scanAllButton_Click);
            // 
            // scanSelectedButton
            // 
            this.scanSelectedButton.Label = "Scan This Email";
            this.scanSelectedButton.Name = "scanSelectedButton";
            this.scanSelectedButton.Click += new Microsoft.Office.Tools.Ribbon.RibbonControlEventHandler(this.scanSelectedButton_Click);
            // 
            // reportPhishingButton
            // 
            this.reportPhishingButton.Label = "";
            this.reportPhishingButton.Name = "reportPhishingButton";
            // 
            // Ribbon1
            // 
            this.Name = "Ribbon1";
            this.RibbonType = "Microsoft.Outlook.Explorer";
            this.Tabs.Add(this.tab1);
            this.Load += new Microsoft.Office.Tools.Ribbon.RibbonUIEventHandler(this.Ribbon1_Load);
            this.tab1.ResumeLayout(false);
            this.tab1.PerformLayout();
            this.group1.ResumeLayout(false);
            this.group1.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        internal Microsoft.Office.Tools.Ribbon.RibbonTab tab1;
        internal Microsoft.Office.Tools.Ribbon.RibbonGroup group1;
        internal Microsoft.Office.Tools.Ribbon.RibbonToggleButton toggleScanButton;
        internal Microsoft.Office.Tools.Ribbon.RibbonButton scanAllButton;
        internal Microsoft.Office.Tools.Ribbon.RibbonButton scanSelectedButton;
        internal Microsoft.Office.Tools.Ribbon.RibbonButton reportPhishingButton;
    }

    partial class ThisRibbonCollection
    {
        internal Ribbon1 Ribbon1
        {
            get { return this.GetRibbon<Ribbon1>(); }
        }
    }
}
