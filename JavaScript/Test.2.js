msindag = 24*60*60*1000;

function Persoon(naam, nummer)
{
  this.naam = naam;
  this.nr = nummer;
  this.print = printPersoon;
  this.set = setPersoon;
}

function printPersoon()
{
   Log.Message("naam = " + this.naam, " en nr = " + this.nr);
}

function setPersoon(naam, nummer)
{
  this.naam = naam; this.nr = nummer;
}

function vergelijk(pers1, pers2)
{
  return (pers1.naam == pers2.naam && pers1.nr == pers2.nr);
}

function mainp()
{
  var tom = new Persoon("tom", 12);
  var piet = new Persoon("piet", 13);
  var klaas = new Persoon();
  var karel = new Persoon();
  var tom2 = new Persoon("tom", 12);
  
  klaas.naam = "klaas";
  klaas.nr = 15;
  karel.set("Karel", 16);
  
  result = vergelijk(tom, tom2);
}

function test(a,b,c,d,e,f)
{
  if (a!="undefined")
    a=2;
  if (b!="undefined")
    b=4;
  if (c!="undefined")
    c=6;
  if (d!="undefined")
    d=8;
  if (e!="undefined")
    e=10;
  if (f!="undefined")
    f=12;
   
}

function maint()
{
  test(3, "undefined", 5, "undefined", 7);
}

dim2 = new Array(3,2);
dim2[0][0] = 1;
dim2[0][1] = "telop(4,6);";
dim2[0][2] = 6;
dim2[1][0] = "telop(10,-3);";
dim2[1][1] = "aap";
dim2[1][2] = 7;
//dim2[2][0] = 3;
//dim2[2][1] = 4;

dim = new Array(6);
dim[0] = 1;
dim[1] = "telop(4,6);";
dim[2] = 6;
dim[3] = "telop(10,-3);";
dim[4] = "aap";
dim[5] = 7;

function telop(x,y)
{
return x+y;
}

function testarray()
{
  x = eval("telop(3,5);");
  y = eval(dim[1]);
  z = eval(dim[3]);
  Log.Message(dim[1] + "  " + dim[3] + "  " + dim[4]);
}

a= "aa";
aa = new Array(3);
eval(a)[0] = 1;
eval(a)[1] = 2;
eval(a)[2] = 5;

function testa()
{
  x = eval(a)[0] + eval(a)[1];
  y = eval(a)[1] + eval(a)[2];
}

 
function testje()
{
var testsetPath = Project.Path + "Data\\Menu12\\TestSets_31" + "\\Tools\\" + "RestoreTools3\\";

var result = Utilities.FileExists(testsetPath + "PUN*");
Log.Message("result = " + result);
} 

function tijdtest()
{
var o1, o2, o3, ms1, ms2, ms3; //, msindag;
var a,b,c;

//msindag = 24*60*60*1000;
o1 = Utilities.Time();
Log.message(o1);
//msindag = 24*60*60*1000;
BuiltIn.Delay(1000);
o2 = Utilities.Time();
//msindag = 24*60*60*1000;
ms1 =  o1*msindag;
ms2 =  o2*msindag;
BuiltIn.Delay(100);
a=100.008023;
b=1000-a;
BuiltIn.Delay(b);
BuiltIn.Delay(100.8888);
o3 = Utilities.Time();
Log.message (ms1);
//Log.message (o1);

//Log.message (o2);
//o3=(o2-o1)*1000;
ms2 =  o2*msindag;
ms3 =  o3*msindag;
Log.Message (ms2);
Log.message (ms2-ms1);
Log.Message (ms3);
Log.message (ms3-ms2);
}