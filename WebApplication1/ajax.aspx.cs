using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication1
{
    public partial class ajax : System.Web.UI.Page
    {
        private static string pwd = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string type = Request["type"].ToString();
                string t = Request["t"];
                t = t.Remove(t.IndexOf('G')).Trim();

                CultureInfo cultureInfo = CultureInfo.CreateSpecificCulture("en-us");
                string format = "ddd MMM dd yyyy HH:mm:ss";// 'GMT' zz00";

                DateTime dt = DateTime.MinValue;
                dt = DateTime.ParseExact(t,format, CultureInfo.InvariantCulture, DateTimeStyles.AdjustToUniversal);

                if (type == "getIsRun")
                {
                    if (dt.AddSeconds(60) >= DateTime.Parse("2018/11/2 23:11:00"))
                    {

                        Response.Write("True$/sqzc.htm$活动开始");
                        Response.End();
                    }
                    else
                    {
                        Response.Write("False$/sqzc.htm$活动暂未开始");
                        Response.End();
                    }
                }
                else if (type == "CheckYZM")
                {
                    if (Request["userpwd"] == pwd)
                    {
                        Response.Write("成功");
                        Response.End();
                    }
                    else
                    {
                        Response.Write("失败");
                        Response.End();
                    }
                }
                else if (type == "getYZMTy")
                {
                    pwd = new Random().Next(100001, 999999).ToString();
                    Response.Write(pwd);
                    Response.End();
                }
                else if (type == "CustLoginFst")
                {
                    Response.Write("登录成功");
                    Response.End();
                }
                else if (type == "getstage")
                {
                    Response.Write("3");
                    Response.End();
                }
                else if (type == "getstartandend")
                {
                    Response.ContentType = "application/json";

                    Response.Write("{starttime:\"2018,11,1,15,00,00\",endtime:\"2018,11,6,15,00,00\"}"); 
                    Response.End();
                }
                else if (type == "getnowtime") {
                    Response.Write(DateTime.Now.ToString("yyyy,M,d,H,m,s"));
                    Response.End();
                }
            }
        }

        /// <summary>  
        /// GMT时间转成本地时间  
        /// </summary>  
        /// <param name="gmt">字符串形式的GMT时间</param>  
        /// <returns></returns>  
        public static DateTime GMT2Local(string gmt)
        {
            DateTime dt = DateTime.MinValue;
            try
            {
                string pattern = "";
                if (gmt.IndexOf("+0") != -1)
                {
                    gmt = gmt.Replace("GMT", "");
                    pattern = "ddd, dd MMM yyyy HH':'mm':'ss zzz";
                }
                if (gmt.ToUpper().IndexOf("GMT") != -1)
                {
                    pattern = "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'";
                }
                if (pattern != "")
                {
                    dt = DateTime.ParseExact(gmt, pattern, System.Globalization.CultureInfo.CurrentCulture, System.Globalization.DateTimeStyles.AdjustToUniversal);
                    dt = dt.ToLocalTime();
                }
                else
                {
                    dt = Convert.ToDateTime(gmt);
                }
            }
            catch(Exception ex)
            {
            }
            return dt;
        }
    }
}