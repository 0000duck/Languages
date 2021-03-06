/*
    This sample demonstrates how to use the Name Mapping plug-in 
    and how to create data-driven tests.
    Test data is extracted from CSV files, Microsoft Access database and 
    Microsoft Excel spreadsheet and placed into the internal array.
    ADO functions and CSV parsing functions allow users to have external data
    access.
    
    The script loads the Orders.exe application from one of these folders:
    TestComplete 4\Samples\Open Apps\OrdersDemo\Delphi,
    TestComplete 4\Samples\Open Apps\OrdersDemo\BCB,
    TestComplete 4\Samples\Open Apps\OrdersDemo\MSVC,
    TestComplete 4\Samples\Open Apps\OrdersDemo\VB.
    You should select the tested application and check the desired item in
    the TestedApps editor. All the other items must be unchecked.
    
	You should compile this aplication before the script run and check its path 
    in the TestedApps editor.
    
    The sample requires the Object-Driven Testing, NameMapping and Utilities plug-ins to be
    installed in TestComplete.

*/

//USEUNIT DataAccess_JS

var tsInternal   = 0
var tsCSVSimple  = 1
var tsCSV_ADO    = 2
var tsAccess_ADO = 3
var tsExcel_ADO  = 4
var CurrentMappedProcessName;

function MainInternal()
{
  Main(tsInternal)
}

function MainCSVSimple()
{
  Main(tsCSVSimple)
}

function MainCSV_ADO()
{
  Main(tsCSV_ADO)
}

function MainAccess_ADO()
{
  Main(tsAccess_ADO)
}

function MainExcel_ADO()
{
  Main(tsExcel_ADO)
}

function Main(Mode)
{
  // There are no bugs. The behavior of the tested application is correct.
  switch (Mode) {
    case tsInternal:   
        MainTest(tsInternal,   false);
        break;
    case tsCSVSimple:  
        MainTest(tsCSVSimple,  false);
        break;
    case tsCSV_ADO:    
        MainTest(tsCSV_ADO,    false);
        break;
    case tsAccess_ADO: 
        MainTest(tsAccess_ADO, false);
        break;
    case tsExcel_ADO:  
        MainTest(tsExcel_ADO,  false);
  }
   
  // To make the behavior of the tested application incorrect.
    switch (Mode) {
    case tsInternal:   
        MainTest(tsInternal,   true);
        break;
    case tsCSVSimple:  
        MainTest(tsCSVSimple,  true);
        break;
    case tsCSV_ADO:    
        MainTest(tsCSV_ADO,    true);
        break;
    case tsAccess_ADO: 
        MainTest(tsAccess_ADO, true);
        break;
    case tsExcel_ADO:  
        MainTest(tsExcel_ADO,  true);
  }
}

function DDT_OnStartTest(Sender)
{
  InitTest()
}
          
function InitTest()
{
  DefineOrderInfoClass()
  InitTestData()
  DataDir = Project.Path + "..\\Data\\"
}

function ChooseNameMappingName(Process)
{
if (Process.MappedName == 'NameMapping.sys2.ordersprocess_msvc')
CurrentMappedProcessName = NameMapping.sys2.OrdersProcess_MSVC;

if (Process.MappedName == 'NameMapping.sys2.ordersprocess_delphi')
CurrentMappedProcessName = NameMapping.sys2.OrdersProcess_Delphi;

if (Process.MappedName == 'NameMapping.sys2.ordersprocess_bcb')
CurrentMappedProcessName = NameMapping.sys2.OrdersProcess_BCB;

if (Process.MappedName == 'NameMapping.sys2.ordersprocess_vb')
CurrentMappedProcessName = NameMapping.sys2.OrdersProcess_VB;
}

function MainTest(Mode, WithBug)
{
  TestedApps.RunAll();

  p = Sys.WaitProcess("Orders", 10000)
  ChooseNameMappingName(p);
 
  w = CurrentMappedProcessName.ordersmainform;
  w.Activate()

  w.MainMenu.Check("[1|2]", WithBug)
  
  w.MainMenu.Click("[1|0]")
  wOrder = CurrentMappedProcessName.NewOrder
  wOrder.Activate();

  OrdersInfoTest(Mode, wOrder)
  
  wOrder.Close()

  w.Close()     
  
  // Wait while the Orders process exists
  while (p.Exists) {
    Delay(100)
  }
}

function OrdersInfoTest(Mode, w)
{
  Log.Message("Test Started", "")

var  ErrCount = 0
  
  switch (Mode) {
    case tsInternal:   OrdArr = ReadInternalData();
        break;
    case tsCSVSimple:  OrdArr = ReadCSVFile();
        break;
    case tsCSV_ADO:    OrdArr = ReadCSV_ADO();
        break;
    case tsAccess_ADO: OrdArr = ReadAccess_ADO();
        break;
    case tsExcel_ADO:  OrdArr = ReadExcel_ADO();
  }

  for (var I = 0; I<OrdArr.length; I++) {
    if (!TestAction(w, OrdArr[I])) {
      ErrCount++
    }  
  }
    
  if (ErrCount == 0) {
    Log.Message("Test is OK.") 
  }
  else {
    Log.Message("Test reveals error(s). Error count is " + IntToStr(ErrCount),"")
  }
}

function TestAction(Window, TestCase)
{
   var TestActionB = true
  
var  cmbProduct =CurrentMappedProcessName.NewOrder.Product
  if (!SameText(cmbProduct.wText, TestCase.Product)) {
    cmbProduct.ClickItem(TestCase.Product)
  }
  
var  edtQuantity = CurrentMappedProcessName.NewOrder.Quantity
  edtQuantity.wText = TestCase.Quantity
    
var  edtUnitPrice = CurrentMappedProcessName.NewOrder.UnitPrice
  if (!SameText(edtUnitPrice.wText, TestCase.UnitPrice)) {
    TestActionB = false
    Log.Error("UnitPrice is incorrect", CaseInfo(Window, TestCase))
  }

var  edtDiscount =CurrentMappedProcessName.NewOrder.Discount
  if (!SameText(edtDiscount.wText, TestCase.Discount)) {
    TestActionB = false
    Log.Error("Discount is incorrect", CaseInfo(Window, TestCase))
  }
  
var  edtTotalPrice = CurrentMappedProcessName.NewOrder.TotalPrice
  if (!SameText(edtTotalPrice.wText, TestCase.TotalPrice)) {
    TestActionB = false
    Log.Error("TotalPrice is incorrect", CaseInfo(Window, TestCase))
  }
    return(TestActionB)
}

function AddControlVal(PropName, RealPropVal, ReqPropVal) {
  var S = PropName + ": " + RealPropVal + " (Real);  " + ReqPropVal + 
    " (Required)\r\n"
  return(S)    
}

function CaseInfo(Window, TestCase)
{
  var CaseInfoStr = "Case values: \r\n\r\n"      

var  cmbProduct = CurrentMappedProcessName.NewOrder.Product
  CaseInfoStr += AddControlVal("Product.wText", cmbProduct.wText, TestCase.Product)

var  edtQuantity = CurrentMappedProcessName.NewOrder.Quantity
  CaseInfoStr += AddControlVal("Quantity.wText", edtQuantity.wText, TestCase.Quantity)

var  edtUnitPrice = CurrentMappedProcessName.NewOrder.UnitPrice
  CaseInfoStr += AddControlVal("UnitPrice.wText", edtUnitPrice.wText, TestCase.UnitPrice)

var  edtDiscount = CurrentMappedProcessName.NewOrder.Discount
  CaseInfoStr += AddControlVal("Discount.wText", edtDiscount.wText, TestCase.Discount)

var  edtTotalPrice = CurrentMappedProcessName.NewOrder.TotalPrice
  CaseInfoStr += AddControlVal("TotalPrice.wText", edtTotalPrice.wText, TestCase.TotalPrice)
return(CaseInfoStr)
}
