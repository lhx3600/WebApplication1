using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication2.Management
{
    public partial class UploadFile : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                string type = Request.Params["ftype"];
                HttpFileCollection files = Request.Files;
                    string fileDestination = string.Empty;
                    if (files.Count > 0)
                    {
                        HttpPostedFile postedFile = Request.Files[0];
                        string fileName = Path.GetFileName(postedFile.FileName);
                        string returnValue = string.Empty;
                        if (fileName != "")
                        {
                            returnValue = SaveFile(postedFile,type);
                        }
                    Response.ContentType = "application/json";
                    Response.Write("{ \"code\":\"0\",\"fid\":\"123\",\"data\":{ \"url\":\"1.jpg\"} }");
                    Response.End();
                    }
            }
            catch (ThreadAbortException) { }
            catch (Exception ex)
            {
                
            }
        }

        public string SaveFile(HttpPostedFile postedFile, string type)
        {
            string UploadFileName = type + DateTime.Now.ToString("yymmddhhmmss");
            string extension = Path.GetExtension(postedFile.FileName);
            string root = "F://CRM图片存储区//" + type + "//";
            string destination = root + UploadFileName + extension;
            string path = type + "/" + UploadFileName + extension;
            if (!Directory.Exists(root))
            {
                Directory.CreateDirectory(root);
            }
            postedFile.SaveAs(destination);
            return UploadFileName + extension;
        }
    }
}