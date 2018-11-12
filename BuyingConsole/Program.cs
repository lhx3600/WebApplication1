using RestSharp;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BuyingConsole
{
    class Program
    {
        private static Stopwatch stopWatch = new Stopwatch();

        static void Main(string[] args)
        {
            stopWatch.Start();
            //装载集合
            ConcurrentBag<string> case1 = new ConcurrentBag<string>(); //方案1，7号楼
            ConcurrentBag<string> case2 = new ConcurrentBag<string>(); //方案2，6号楼
            ConcurrentBag<string> case3 = new ConcurrentBag<string>(); //方案3，4号楼
            ConcurrentBag<string> case4 = new ConcurrentBag<string>(); //方案4，5号楼
            Task.Factory.StartNew(() =>
            {
                Parallel.For(0, 20, index =>
                {
                    case2.Add("6-"+(19+ index) +"04");
                });
            }).Wait();

            Task.Factory.StartNew(() =>
            {
                Parallel.For(0, 10, index =>
                {
                    case1.Add("7-" + (19 + index) + "01");
                    case3.Add("4-" + (19 + index) + "02");
                    case3.Add("4-" + (19 + index) + "03");
                    case4.Add("5-" + (19 + index) + "02");
                    case4.Add("5-" + (19 + index) + "03");
                });
            }).Wait();

            Console.WriteLine("Initialization data loading complete. "+ stopWatch.ElapsedMilliseconds +"ms.");
            Thread.Sleep(1000);
            Console.WriteLine("Total number of statistics stored." + case1.Count + "," + case2.Count + "," 
                + case3.Count + "," + case4.Count);
            Console.WriteLine("Initialization data loading start. " + stopWatch.ElapsedMilliseconds + "ms.");

            //模拟系统登录

            //Parallel.For(0, 2000, (index,state) =>
            //{
            //    SingleRequest(index,state);
            //});

            //for (int i = 0; i < 2000; i++) {
            //    SingleRequest(i);
            //}
            stopWatch.Stop();
           
            
            case1.ToList().ForEach(a => { Console.WriteLine("" + a); });
            case2.ToList().ForEach(a => { Console.WriteLine("" + a); });
            case3.ToList().ForEach(a => { Console.WriteLine("" + a); });
            case4.ToList().ForEach(a => { Console.WriteLine("" + a); });
        }

        private static void SingleRequest(int index,ParallelLoopState state)
        {
           
            var client = new RestClient("http://10.204.10.140:8081/ajax.aspx?type=getnowtime1");
            var request = new RestRequest(Method.GET);
            var response = client.Execute(request);
            if (response.StatusCode == HttpStatusCode.OK) {
                if (index == 1111)
                {
                    state.Stop();
                }
                Console.WriteLine(index);
            }
            
        }


    }
}
