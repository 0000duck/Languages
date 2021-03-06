
// Demos and example functions


/***************************************************************************************
* Comment example                                                                      *
*                                                                                      *
* input:  variable  // raw file buffer                                                 *  
*         variable  // file name                                                       *
* output: variable  // MTAB_ERROR_INFO  file read error                                *  
*                                                                                      *
*                                                                                      *
****************************************************************************************/

/****************************************************************************/
/* Comment example ........................................
   ........................................................
   ...................... */
/* NOTE: ............................................... */

//-----------------------------------------------------------------------------
function GetArrayLength(array)
{
  return (array.length);  
}
  
//-----------------------------------------------------------------------------
function JscriptArray()
{
  var parm = new Object();
  // Add two expando properties, 'guiName' and 'age'
  parm.guiName = "InchMMselect";
  parm.value = 3;
  parm.preText = "P12"
  
  test = parm.guiName;
}

//-----------------------------------------------------------------------------
function JscriptString()
{
  //newString = new String(["stringLiteral"]);
  
  var gamma, delta;
  var s, test, len;
  gamma = new String("This is a string");
  delta = "This is also a string";

  len = gamma.length;
  gamma.test = 10; 
  
  len = delta.length;
  delta.test = 10; 
  
  s1 = gamma
  s2 = delta
  test1 = gamma.test; 
  test2 = delta.test; 
}

//-----------------------------------------------------------------------------
function TestReplaceDemo()
{
  var test
  test = ReplaceDemo()
}

//-----------------------------------------------------------------------------
function ReplaceDemo()
{
   var r, re;                    //Declare variables.
   var ss = "The man hit the ball with the bat.\n";
   ss += "while the fielder caught the ball with the glove.";
   re = /The/g;             //Create regular expression pattern.
   r = ss.replace(re, "A");    //Replace "A" with "The".
   return(r);                   //Return string with replacement made.
}

//-----------------------------------------------------------------------------
function CompareFloatTest()
{
  var result;
  var value1, value2, tolerance
  
  value1 = 1.01
  value2 = 2.02
  tolerance = 0.5
  result = CompareFloat(value1, value2, tolerance)
  Log.Message(value1 + " " + value2 + " " + tolerance + ". Result is " + result);

  value1 = 2.02
  value2 = 1.01
  tolerance = 0.5
  result = CompareFloat(value1, value2, tolerance)
  Log.Message(value1 + " " + value2 + " " + tolerance + ". Result is " + result);

  value1 = 1.01
  value2 = 2.02
  tolerance = 1.03
  result = CompareFloat(value1, value2, tolerance)
  Log.Message(value1 + " " + value2 + " " + tolerance + ". Result is " + result);

  value1 = 2.00
  value2 = 1.00
  tolerance = 1.02
  result = CompareFloat(value1, value2, tolerance)
  Log.Message(value1 + " " + value2 + " " + tolerance + ". Result is " + result);
}

//-----------------------------------------------------------------------------
function CompareFloat(value1, value2, tolerance)
{
  var result;
  var diff;
  
  diff = Math.abs(value1 - value2)
  
  if (typeof(tolerance) == "undefined")
  {
    tolerance = 0.000001;
  }
  if (diff < tolerance){
    result = 0;
  }  
  else{
    Log.Message( "Difference is " + diff);
    if (value1 > value2){
      result = 1
    }  
    else{
      result = -1
    }
  }
    
  return result;
}

//-----------------------------------------------------------------------------
function GetOptionalParameterValue(optionalParameter, defaultValue)
{
  // Check if optional parameter exists.
  // (use strict equality operator, because false is equal to "" with equality operator)
  if ( typeof(optionalParameter) == "undefined" || optionalParameter === "" )   
    optionalParameter = defaultValue;

  return optionalParameter  
}

//-----------------------------------------------------------------------------
function Test()
{
  var ss = "Test2";

  //re = /(.*)=(.*)/;             //Create regular expression pattern.
  var re = /(.*)((\d+)*)/;
   
  var result = ss.replace(re, "$1");    //Isolate value.
  
}

//-----------------------------------------------------------------------------
//Read the file paths.ini and return the path depending on parameter keystring
function OpenIniPaths(keystring)
{
  var ToolsDir = ProjectSuite.Variables.ToolsDir;
  var i, j;   
  var FS, F, s;
  var found = false;
  
  if (!Utilities.FileExists(ToolsDir + "paths.ini")) return "";
  
  FS = Sys.OleObject("Scripting.FileSystemObject");
  // Note that you can create the FileSystemObject using the following code:
  // FS = new ActiveXObject("Scripting.FileSystemObject")
  F = FS.OpenTextFile(ToolsDir + "paths.ini", 1);    // open file ForReading = 1
  while(! F.AtEndOfStream && !found){
    s = F.ReadLine();
    i = s.indexOf("\=");
    if ( s.substring(0, i-1) == keystring )  found = true;
  }
  
  F.Close(); 
  if (found)
  {
    i = s.indexOf("\"");
    j = s.lastIndexOf("\"");
    return ( s.substring(i+1,j));
  }
  else
  {
    return ("");
  }
}

//-----------------------------------------------------------------------------
function CheckFiles(SourcePath, TargetPath, searchFile)
{
  var i, SearchRec;
  var result = true;
  
  SearchRec = Utilities.TSearchRec(); // This line is necessary !!!
  i = FindFirst(SourcePath + searchFile, faAnyFile, SearchRec);
  while (i == 0)
  {
    if ( CheckFile( TargetPath, SearchRec.Name ) == false)
      result = false;
    i = FindNext(SearchRec);
  };
  // FindClose is in Win32API.pls and Utilities.pls
  Utilities.FindClose(SearchRec);
  
  return result;
}

//-----------------------------------------------------------------------------
function CheckAllFiles(SourcePath, TargetPath)
{
  var i, SearchRec;
  var result = true;
  
  SearchRec = Utilities.TSearchRec(); // This line is necessary !!!
  i = FindFirst(SourcePath + "*.*", faAnyFile, SearchRec);
  while (i == 0)
  {
      // don't take the current path and parent path into account
      if ( SearchRec.Name != "." && SearchRec.Name != "..")
      {
         if (CheckFile( TargetPath, SearchRec.Name ) == false)
            result = false;
      }
      i = FindNext(SearchRec);
  };
  // FindClose is in Win32API.pls and Utilities.pls
  Utilities.FindClose(SearchRec);
  
  return result;
}

//-----------------------------------------------------------------------------
function CheckFile(dir,fname)
{
  if ( !(result = CheckIfFileExists( dir + fname )))
     Log.Warning("File " + fname + " not copied!")
  return result;
}


//-----------------------------------------------------------------------------
function GetFileSize(FileName)
{
  var fs, f;

  fs = Sys.OleObject('Scripting.FileSystemObject');
  if( fs.FileExists(FileName) )
  {
    f = fs.GetFile(FileName);
    Result = f.Size;
  }
  else
  {
    Result = -1;
  }
  
  return Result;
}  

//-----------------------------------------------------------------------------
function GetValueRegDataINI(optionName)
{
  var INIFileName = Project.Path + "Stores\\Files\\reg_data.ini";

  if ( !Utilities.FileExists(INIFileName) )
    Log.Error("File does not exist!") 

  var INIRootSection = Storages.INI(INIFileName);
    
  // Count number of options in INI file
  var NrOptions = INIRootSection.OptionCount;         // for debug only
  var OptionNames = INIRootSection.GetOptionNames();  // for debug only
/*  
  var s1 = GetSectionNames();
  var Section = GetSubSection(sectionName);
*/  
  var optionValue = INIRootSection.GetOption(optionName, "Empty");
    
  return optionValue;
}

//-----------------------------------------------------------------------------
function ReadFileAndLogWarning(AFileName)
{
  var FS, F, s;
  var ForReading = 1;
  var ForWriting = 2;
  var ForAppending = 8;
  FS = Sys.OleObject("Scripting.FileSystemObject");
  // Note that you can create the FileSystemObject using the following code:
  // FS = new ActiveXObject("Scripting.FileSystemObject")
  F = FS.OpenTextFile(AFileName, ForReading);
  while(! F.AtEndOfStream)
  {
    s = F.ReadLine();
    if (s.length > 5) // Non-empty string
      Log.Warning(s);
  }
  F.Close();
} 

//-----------------------------------------------------------------------------
function SetDecimals(s, dpp)
{
  var r
  
  if (s == "x" ) /* Keep string if it is "x" (not alfanumeric) */ 
    return s
    
  if (s.indexOf("_") == 0) {    // Empty value like "___.__"
    if (s.indexOf(".") > 0)    
      r = s.substring(0,s.indexOf(".") + (dpp > 0 ? dpp + 1 : 0)) 
    else
      r = s
  }
  else {
    r = parseFloat(s).toFixed(dpp).toString()
  }

  return r 
}

//-----------------------------------------------------------------------------
function CreateParametersData(Filename)
{
  var ForReading = 1
  var FS = Sys.OleObject("Scripting.FileSystemObject") 
  var F = FS.OpenTextFile(Filename, ForReading, false);
  var arr, data, cls;
  var LineCount = 0
  var S      
  var Count   
  var par

  arr = ODT.Data.Groups(Project.Variables.DataGroupName).TestParameters;

  while (!F.AtEndOfStream) {
    S = F.ReadLine();
    
    Count = GetCSVCount(S)
    if (Count != 7) {continue}
    
    par = arr.AddItemOfClassType("ParameterInfo");
     
    par.Parameter    = GetCSVItem(S, 0) 
    par.InitialValue = GetCSVItem(S, 1)
    par.Minimum      = GetCSVItem(S, 2)
    par.Maximum      = GetCSVItem(S, 3)
    par.InputValue1  = GetCSVItem(S, 4)
    par.InputValue2  = GetCSVItem(S, 5)
    par.InputValue3  = GetCSVItem(S, 6)
    EnableAllMethods(par);
    
    LineCount++
  }        
  F.Close()
  
  return arr;
}
   
//-----------------------------------------------------------------------------
function ReadParametersFile(Filename)
{
  var ForReading = 1
  var FS = Sys.OleObject("Scripting.FileSystemObject") 
  var F = FS.OpenTextFile(Filename, ForReading, false);
  var ParArr = new Array()
  var LineCount = 0
  var S      
  var Count   
  var ParInfo
  
  while (!F.AtEndOfStream) {
    S = F.ReadLine();
    
    Count = GetCSVCount(S)
    if (Count != 7) {continue}
    
    ParInfo = CreateParameterInfo()
     
    ParInfo.Parameter    = GetCSVItem(S, 0) 
    ParInfo.InitialValue = GetCSVItem(S, 1)
    ParInfo.Minimum      = GetCSVItem(S, 2)
    ParInfo.Maximum      = GetCSVItem(S, 3)
    ParInfo.InputValue1  = GetCSVItem(S, 4)
    ParInfo.InputValue2  = GetCSVItem(S, 5)
    ParInfo.InputValue3  = GetCSVItem(S, 6)
    
    LineCount++
    ParArr[LineCount-1] = ParInfo
  }        
  F.Close()

  return(ParArr)   
}

//-----------------------------------------------------------------------------
// Helper routine. It deletes spaces in option names.                    
function ReplaceBlanks(S)
{
var Result, I, C;
  Result = "";
  for (I = 0; I < S.length; I++) 
  {               
    C = S.substring(I, I + 1);
    if (C == " ") C = "_";
    Result = Result + C;
  }
  return Result;  
}

//-----------------------------------------------------------------------------
// Helper routine. It compares two substrings.                    
function CompareStrings(s1, s2, start, length)
{
var Result = false

  if( s1.substring(start, length) == s2.substring(start, length)) {
    Result = true
  }   

  return Result;  
}

//-----------------------------------------------------------------------------
// Helper routine. It strips number from string.                    
function StripNumbers(S)
{
var Result, I, C;
  Result = "";
  for (I = 0; I < S.length; I++) 
  {               
    C = S.substring(I, I + 1);
    if (C >= "1" && C <= "9") C = "";
    Result = Result + C;
  }
  return Result;  
}


//-----------------------------------------------------------------------------
function GetObjectValue(obj)
{
  var r, re;                    //Declare variables.
  var ss;
  
  ss = obj.WndCaption;
  
  re = /(.*)=(.*)/;             //Create regular expression pattern.
   
  r = ss.replace(re, "$2");    //Isolate value.
  return(r);                   //Return string with value.
}

//-----------------------------------------------------------------------------
function GetObjectName(obj)
{
  var r, re;                    //Declare variables.
  var ss;
  
  ss = obj.WndCaption;

  re = /(.*)=(.*)/;             //Create regular expression pattern.
   
  r = ss.replace(re, "$1");    //Isolate value.
  return(r);                   //Return string with value.
}

//-----------------------------------------------------------------------------
function ExtractFirstValue(objWndCaption, separator)
{
  var r, re;                    //Declare variables.
  var ss;
  
  ss = objWndCaption;
  
  switch(separator)             //Create regular expression pattern.
  {
    case "_": re = /(.*)_(.*)/; break;

    default : Log.Error("Incorrect separator value!"); 
  }

  r = ss.replace(re, "$1");     //Isolate value.
  return(r);                    //Return string with value.
}

//-----------------------------------------------------------------------------
function ExtractLastValue(objWndCaption, separator)
{
  var r, re;                    //Declare variables.
  var ss;
  
  ss = objWndCaption;

  switch(separator)             //Create regular expression pattern.
  {
    case "_": re = /(.*)_(.*)/; break; 

    default : Log.Error("Incorrect separator value!"); 
  }
    
  r = ss.replace(re, "$2");     //Isolate value.
  return(r);                    //Return string with value.
}

//-----------------------------------------------------------------------------
function RemoveLeadingSpaces(str)
{
  var pos = 0; 
  while (str.charAt(pos) == " ")
  {
    pos++;
  }
  str = str.substr(pos);
        
  return str
}


//-----------------------------------------------------------------------------
function ReadRegINI()
{
  var INIFileName;    
  var INISection, OptionName;
  var NrSections, SectionOptions;
  var testedAppDataPath, ProgramDirLoc;

  ProjDir = Project.Path;

  INIFileName = ProjDir + "Stores\\Files\\reg_data.ini";

  if ( !Utilities.FileExists(INIFileName) )
    Log.Error("File does not exist!") 
  else
    test1 = "File exists."

  INISection = Storages.INI(INIFileName);
    
  // Count number of options in INI file
  NrSections = INISection.OptionCount;
  SectionOptions = INISection.GetOptionNames();
  
  testedAppDataPath = INISection.GetOption("DataPath", "Empty");
  testedAppRootPath = INISection.GetOption("RootPath", "Empty");
    
  ProjectSuite.Variables.TestedAppDataPath = testedAppDataPath;
  ProjectSuite.Variables.TestedAppRootPath = testedAppRootPath;
  //Project.Variables.ToolDataPath = testedAppDataPath + "TOOLS\\";
  //Project.Variables.ProdDataPath = testedAppDataPath + "products\\";

  //Log.CloseNode();  
}

//-----------------------------------------------------------------------------
function CopyRegistryDataToRegINIFile()
{
  //Log.CreateNode("CopyRegistryDataToRegINIFile");

  ProfileWSectionName = "Software\\Delem\\ProfileW";
  INIFile = "reg_data.ini";
  XMLFile = "reg_data.xml";
  BINFile = "reg_data.bin";

  var ProjectDir;        
  var RegSection, OptionName;
  var INISection, XMLSection, BINSection;
  var nrSections;

// The following line was changed by TestComplete 4:
//   ProjectDir = Project.Path       
  ProjectDir = Project.Path       
  INIFileName = ProjectDir + "Stores\\Files\\" + INIFile;
  XMLFileName =  ProjectDir + "Stores\\Files\\" + XMLFile;
  BINFileName =  ProjectDir + "Stores\\Files\\" + BINFile;        

  // Open specified registry section   
  RegSection = Storages["Registry"](ProfileWSectionName, HKEY_LOCAL_MACHINE);

  if ( Files["ContainsFile"](INIFileName) )
    Files["Delete"](INIFileName)
  if ( Files["ContainsFile"](XMLFileName) )
    Files["Delete"](XMLFileName)
  if ( Files["ContainsFile"](BINFileName) )
    Files["Delete"](BINFileName)            
    
  //Open the specified files and returns the FileSection object for its root section.
  //If the files do not exist, they will be created in memory.
  INISection = Storages.INI(INIFileName);
  //INISection.Clear();
  XMLSection = Storages["XML"](XMLFileName);
  BINSection = Storages["Binary"](BINFileName);
    
  OptionName = "DataPath";
  CopyOption(RegSection, INISection, OptionName);    
  //CopyOptionFromRegToXML(RegSection, XMLSection, OptionName);    
  CopyOption(RegSection, XMLSection, OptionName);    
  //CopyOptionFromRegToBIN(RegSection, BINSection, OptionName);    
  CopyOption(RegSection, BINSection, OptionName);    

  OptionName = "RootPath";    
  CopyOption(RegSection, INISection, OptionName);        
  //CopyOptionFromRegToXML(RegSection, XMLSection, OptionName);        
  CopyOption(RegSection, XMLSection, OptionName);            
  //CopyOptionFromRegToBIN(RegSection, BINSection, OptionName);            
  CopyOption(RegSection, BINSection, OptionName);                

  OptionName = "ShowTestLabels";
  CopyOption(RegSection, INISection, OptionName);    
  //CopyOptionFromRegToXML(RegSection, XMLSection, OptionName);    
  CopyOption(RegSection, XMLSection, OptionName);    
  //CopyOptionFromRegToBIN(RegSection, BINSection, OptionName);    
  CopyOption(RegSection, BINSection, OptionName);    
  
  OptionName = "SplashScreenEnabled";
  CopyOption(RegSection, INISection, OptionName);    
  //CopyOptionFromRegToXML(RegSection, XMLSection, OptionName);    
  CopyOption(RegSection, XMLSection, OptionName);    
  //CopyOptionFromRegToBIN(RegSection, BINSection, OptionName);    
  CopyOption(RegSection, BINSection, OptionName);    
  
  // Count number of options in INI file
  nrINISections = INISection.OptionCount;
  nrXMLSections = XMLSection.OptionCount;
  nrBINSections = BINSection.OptionCount;
  
  // Save options to the file for which the FileSection object was created
  INISection["Save"]();
  XMLSection["Save"]();
  BINSection["Save"]();   

  // Append the file to the storesObj collection    
  Files["Add"](INIFileName);
  Files["Add"](XMLFileName);    
  Files["Add"](BINFileName);   
  
  //Log.CloseNode(); 
}

/*
//-----------------------------------------------------------------------------
function CopyOptionFromRegToXML(RegSection, XMLSection, OptionName)
{
  var defaultValue = "Unknown";
  var s1, s2;
    
  s1 = "Registry key " + OptionName + " written to XML file."
  s2 = "Registry key " + OptionName + " can not be written to XML file."

  if ( RegSection["OptionExists"](OptionName) )
  {
    OptionValue = RegSection.GetOption(OptionName, defaultValue);     
    XMLSection.SetOption(OptionName, OptionValue);
    Log.Message(s1);
  }
  else
    Log.Error(s2);
}

//-----------------------------------------------------------------------------
function CopyOptionFromRegToBIN(RegSection, BINSection, OptionName)
{
  var defaultValue = "Unknown";
  var s1, s2;
    
  s1 = "Registry key " + OptionName + " written to BIN file."
  s2 = "Registry key " + OptionName + " can not be written to BIN file."

  if ( RegSection["OptionExists"](OptionName) )
  {
    OptionValue = RegSection.GetOption(OptionName, defaultValue);     
    BINSection.SetOption(OptionName, OptionValue);
    Log.Message(s1);
  }
  else
    Log.Error(s2);
}
*/

//-----------------------------------------------------------------------------
function CopyOption(SourceSection, TargetSection, OptionName)
{
  var defaultValue = "Unknown";
  var s1, s2;
  
  s1 = "Section data " + OptionName + " written to target."
  s2 = "Section data " + OptionName + " can not be written to target."

  if ( SourceSection["OptionExists"](OptionName) )
  {
    OptionValue = SourceSection.GetOption(OptionName, defaultValue); 
    OptionName = Utilities.StringReplace(OptionName, " ", "_", 3);        
    TargetSection.SetOption(OptionName, OptionValue);
  }
  else
    Log.Error(s2);
}

//-----------------------------------------------------------------------------
function SetRegistry()
{
  ProfileWSectionName = "Software\\Delem\\ProfileW";
  INIFile = "reg_data.ini";
   
  var RegSection, OptionName;
  var INISection, XMLSection, BINSection;
  var nrSections;
  
  RegSection = Storages["Registry"](ProfileWSectionName, HKEY_LOCAL_MACHINE);
  INISection = Storages.INI(INIFile);
    
  // Count number of options in INI file
  nrINISections = INISection.OptionCount;
    
  OptionName = "DataPath";
  CopyOptionFromINItoReg(RegSection, INISection, OptionName);    

  OptionName = "RootPath";    
  CopyOptionFromRegToINI(RegSection, INISection, OptionName);        
    
  INISection["Save"]();
}

//-----------------------------------------------------------------------------
function CreateMatTableXMLfile()
{
  MaterialSectionName = "Software\\Delem\\VBend\\Settings\\Materials";  
  
  XMLFile = "mat_table.xml";

  var ProjectDir;        
  var RegSection, OptionName;
  var XMLSection;
  var NrOfXMLSections, Nr0fRegSections, SectionName, RegSectionNames;
  var RegSubSection, XMLSubSection
  var s1;

  ProjectDir = Project.Path       
  XMLFileName =  ProjectDir + "Stores\\Files\\" + XMLFile;

  // Open specified registry section. If the key doesn't exist, the method creates it.
  RegSection = Storages["Registry"](MaterialSectionName, HKEY_CURRENT_USER);

  // Open the specified .xml file and returns the FileSection object for its root section. 
  // If the file does not exist, XML creates it in memory.
  XMLSection = Storages["XML"](XMLFileName);
  
  // If file is already referred to by an item in the storesObj collection,
  // delete file from disk.
  if ( Files["ContainsFile"](XMLFileName) )
    Files["Delete"](XMLFileName)


  Nr0fRegSections = RegSection.SectionCount;
  //RegSectionNames = RegSection["GetSectionNames"];

  for (i = 0; i < Nr0fRegSections; i++)  
  {
    SectionName = RegSection["GetSectionName"](i);
    //RegSection["GetSubSectionByIndex"](i);
    RegSubSection = RegSection["GetSubSection"](SectionName);
        
    SectionName = Utilities.StringReplace(SectionName, " ", "_", 3);
    XMLSubSection = XMLSection["GetSubSection"](SectionName);

    OptionName = "E Module";
    CopyOption(RegSubSection, XMLSubSection, OptionName);    

    OptionName = "Tensile Strength";    
    CopyOption(RegSubSection, XMLSubSection, OptionName);            
  }

  // Count number of options in XML file
  NrOfXMLSections = XMLSection.SectionCount;
  
  // Save options to the file for which the XMLSection object was created
  XMLSection["Save"]();

  // Append the file to the storesObj collection    
  if (!Files["Add"](XMLFileName))
  {
    s1 = Files["LastError"];
  }    
}

//-----------------------------------------------------------------------------
function ReadMatTableXMLfile()
{
//  var ProjectDir;        
  var RegSection, OptionName, OptionValue;
  var XMLSection;
  var NrOfXMLSections, Nr0fRegSections, SectionName, RegSectionNames;
  var RegSubSection, XMLSubSection
  var i, j, s1;
  var defaultValue = "Unknown";

  XMLFile = "POC_0099.xml";

// The following line was changed by TestComplete 4:
//   ProjectDir = Project.Path       
  ProjectDir = Project.Path       
  XMLFileName =  ProjectDir + "Stores\\Files\\" + XMLFile;

  // Open the specified .xml file and returns the FileSection object for its root section. 
  // If the file does not exist, XML creates it in memory.
  XMLSection = Storages["XML"](XMLFileName);
                         
  Nr0fXMLSections = XMLSection.SectionCount;
  //RegSectionNames = RegSection["GetSectionNames"];

  for (i = 0; i < Nr0fXMLSections; i++)  
  {
    SectionName = XMLSection["GetSectionName"](i);
    //RegSection["GetSubSectionByIndex"](i);
    XMLSubSection = XMLSection["GetSubSection"](SectionName);
        
    NrOfXMLOptions = XMLSubSection.OptionCount;
     
    for (j = 0; j < NrOfXMLOptions; j++)  
    {
      OptionName = XMLSubSection["GetOptionName"](j);
      OptionValue = XMLSubSection.GetOption(OptionName, defaultValue)
      s1 = SectionName + ":" + OptionName + "="  + OptionValue;
      Log.Message(s1);
    }
  }
}

//-----------------------------------------------------------------------------
function ReadXMLfile()
{
//  var ProjectDir;        
  var RegSection, OptionName, OptionValue;
  var XMLSection;
  var NrOfXMLSections, Nr0fRegSections, SectionName, RegSectionNames;
  var RegSubSection, XMLSubSection
  var i, j, s1;
  var defaultValue = "Unknown";

  XMLFile = "mac_0099.xml";

// The following line was changed by TestComplete 4:
//   ProjectDir = Project.Path       
  ProjectDir = Project.Path       
  XMLFileName =  ProjectDir + "Stores\\Files\\" + XMLFile;

  // Open the specified .xml file and returns the FileSection object for its root section. 
  // If the file does not exist, XML creates it in memory.
  XMLSection1 = Storages["XML"](XMLFileName);
    
  // Section 1: count subsections
  Nr0fXMLSections1 = XMLSection1.SectionCount; // SectionName 1 = XMLStorage
  for (k = 0; k < Nr0fXMLSections1; k++)  
  {
    SectionName2 = XMLSection1["GetSectionName"](k); // SectionName 2 = ProgramConstants
    XMLSection2 = XMLSection1["GetSubSection"](SectionName2);

    // Section 2: count subsections        
    Nr0fXMLSections2 = XMLSection2.SectionCount;    
    for (l = 0; l < Nr0fXMLSections2; l++)  
    {
      SectionName3 = XMLSection2["GetSectionName"](l); // SectionName 3 = Parameter_IS
      XMLSection3 = XMLSection2["GetSubSection"](SectionName3);
        
      NrOfXMLOptions3 = XMLSection3.OptionCount;
     
      for (m = 0; m < NrOfXMLOptions3; m++)  
      {
        OptionName = XMLSection3["GetOptionName"](m);
        OptionValue = XMLSection3.GetOption(OptionName, defaultValue)
        s1 = SectionName2 + ":" + SectionName3 + ":" + OptionName + "="  + OptionValue;
        Log.Message(s1);
      }
    }
  }
}

//-----------------------------------------------------------------------------
function CreateParametersData(Groupname, Filename)
{
  var ForReading = 1
  var FS = Sys.OleObject("Scripting.FileSystemObject") 
  var F = FS.OpenTextFile(Filename, ForReading, false);
  var arr, data, cls;
  var LineCount = 0
  var S      
  var Count   
  var par

  arr = ODT.Data.Groups(Groupname).TestParameters;

  while (!F.AtEndOfStream) {
    S = F.ReadLine();
    
    Count = GetCSVCount(S)
    if (Count != 7) {continue}
    
    par = arr.AddItemOfClassType("ParameterInfo");
     
    par.Parameter    = GetCSVItem(S, 0) 
    par.InitialValue = GetCSVItem(S, 1)
    par.Minimum      = GetCSVItem(S, 2)
    par.Maximum      = GetCSVItem(S, 3)
    par.InputValue1  = GetCSVItem(S, 4)
    par.InputValue2  = GetCSVItem(S, 5)
    par.InputValue3  = GetCSVItem(S, 6)
    EnableAllMethods(par);
    
    LineCount++
  }        
  F.Close()
  
  return arr;
}

//-----------------------------------------------------------------------------
function ExcelWorkbookTest()
{
  var Excel, i, j, s;
  var FileName = DataDir + ExcelFileName;

  Excel = OpenExcelWorkbook(FileName);
  ReadExcelWorkbook(Excel);
  CloseExcelWorkbook(Excel);
}

//-----------------------------------------------------------------------------
function OpenExcelWorkbook( FileName )
{
  var Excel;
  
  Excel = Sys.OleObject("Excel.Application");
  BuiltIn.Delay (3000); // Wait until Excel starts
  Excel.Visible = true;
  Excel.Workbooks.Open(FileName);

  return Excel;
} 

//-----------------------------------------------------------------------------
function ReadExcelWorkbook( ExcelObject )
{
  var Excel = ExcelObject;
  var i, j, s;

  for (i = 1;i<=10; i++)
  {
    s = "";
    for (j = 1;j<=5;j++)
      s = s + VarToString(Excel.Cells(i, j)) + Chr(13) + Chr(10)
    Log.Message("Row: " + VarToString(i), s);
  }
} 

//-----------------------------------------------------------------------------
function CloseExcelWorkbook( ExcelObject )
{
  var p;
  
  ExcelObject.Workbooks.Close();
  BuiltIn.Delay (3000); // Wait until Excel closed
//  ExcelObject.Close();
  p = Sys.Process("EXCEL");
  if(p.Exists)
    p.Close();
  BuiltIn.Delay (3000); // Wait until Excel closed
//  if(p.Exists)
//    p.Terminate();
} 

//-----------------------------------------------------------------------------
function ExampleReadDataFromExcel()
{
  var Excel, i, j, s;
  var FileName = DataDir + ExcelFileName;
  
  Excel = Sys.OleObject("Excel.Application");
  BuiltIn.Delay (3000); // Wait until Excel starts
  Excel.Visible = true;
  Excel.Workbooks.Open(FileName);

  for (i = 1;i<=10; i++)
  {
    s = "";
    for (j = 1;j<=5;j++)
      s = s + VarToString(Excel.Cells(i, j)) + Chr(13) + Chr(10)
    Log.Message("Row: " + VarToString(i), s);
  }
  Excel.Workbooks.Close(FileName);
} 

//-----------------------------------------------------------------------------
function ReadExcel_TestDataSheet() 
{
  var ConnStr = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + DataDir + ExcelFileName + 
    ";Extended Properties=Excel 8.0"

  var Connection = Sys.OleObject("ADODB.Connection")
  
  Connection.Open(ConnStr)
  var Recordset = Connection.Execute("SELECT * FROM [" + ExcelTableName + "$]")
  Log.Message("Column count is " + Recordset.ColumnCount)
  
  var ColumnCount = 4 //Recordset.ColumnCount
  var TestDataArr = new Array(NumRows)
  var LineCount = 0
  var TestDataLine = new Array(ColumnCount)

  while (!Recordset.EOF()) {
//    TestDataLine(0)    = Recordset.Value(0)
    for (var I=2;I<ColumnCount;I++)
    {
      if (Recordset.Value(I))
      {
        TestDataLine(I)  = Recordset.Value(I)
        Log.Message("Row " + LineCount.toString + ", Column " + I.toString + ": " + TestDataLine(I))
      }
      else
      {
        Log.Message("Row " + LineCount.toString + ", Column " + I.toString + ": <empty>")
      }  
    }
    LineCount++
    TestDataArray[LineCount-1] = TestDataLine
    
    Recordset.MoveNext() 
  }

  Recordset.Close()
  Connection.Close()
  
  return(TestDataArray)   
}

//-----------------------------------------------------------------------------
function ReadExcel_ADO() 
{
  var ConnStr = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + DataDir + ExcelFileName + 
    ";Extended Properties=Excel 8.0"

  var Connection = Sys.OleObject("ADODB.Connection")
  
  Connection.Open(ConnStr)
  var Recordset = Connection.Execute("SELECT * FROM [" + ExcelTableName + "$]")

  var OrdArr = new Array(NumCases)
  var LineCount = 0
  var OrdInfo
  while (!Recordset.EOF) {
    if (Recordset.ColumnCount) Log.Message("Column count is " + Recordset.ColumnCount)
    OrdInfo = CreateOrderInfo()
    if (Recordset("TestScenarios").Value) Log.Message( Recordset("TestScenarios").Value + " = " + Recordset("Test1").Value)
    
//    if (Recordset("TestScenarios").Value)   OrdInfo.TestScenarios    = Recordset.Value(0)
    if (Recordset("Test1").Value) OrdInfo.Test1   = Recordset("Test1").Value;
    if (Recordset("Test2").Value) OrdInfo.Test2  = Recordset("Test2").Value
    if (Recordset("Test3").Value) OrdInfo.Test3   = Recordset("Test3").Value
    if (Recordset("Test4").Value) OrdInfo.Test4 = Recordset("Test4").Value
    
    LineCount++
    OrdArr[LineCount-1] = OrdInfo
    
    Recordset.MoveNext() 
  }

  Recordset.Close()
  Connection.Close()
  
  return(OrdArr)   
}

//-----------------------------------------------------------------------------
// Posts data to the log (helper routine)
function ProcessTestData( excelDriver )
{
  var commandName = excelDriver.Value(0);
  var parameterName = excelDriver.Value(1);
  var columnOffset = 1;
  var dataRow  = new Array(NumColumns);
  var sName = "";

  if( typeof(commandName) == "string") // Skip empty lines
  {
    sName = sName + commandName;
  }
  if( typeof(parameterName) == "string") // Skip empty lines
  {
    sName = sName + parameterName;
  }
  if( typeof(commandName) == "string" || typeof(parameterName) == "string") // Skip empty lines
  {
    Log.AppendFolder(commandName + " " + parameterName);
    dataRow[0] = commandName;
    dataRow[1] = parameterName;
    for (var i = 1; i < excelDriver.ColumnCount - columnOffset; i++)
    {
      var value = excelDriver.Value(columnOffset + i);
      var valueText = "<empty>";
      var type = typeof(value);
      
      switch (type)
      {
        case "number":
          valueText = FloatToStr(value);
          break;
        case "string":
          valueText = value;
          break;
        case "boolean":
          valueText = IntToStr(value);
          break;
        case "undefined":
        case "object":
        default:  
          break;
      } 
      Log.Message( "Test " + IntToStr(i) + ": (" + type + ")" + valueText );
      dataRow[columnOffset + i] = excelDriver.Value(columnOffset + i);
    }
    Log.PopLogFolder();
  }   
  
  return dataRow;
}

//-----------------------------------------------------------------------------
function PrintToFileTest()
{
  var FileName = "D:\\test\\testfile.csv"
  var Str = "Testje";
      
  BuiltIn.SaveStrToFile(FileName, Str + ", " + Str + "1\r\n", false) // Append to file 
  BuiltIn.SaveStrToFile(FileName, Str + ", " + Str + "2\r\n", true) // Append to file 
  BuiltIn.SaveStrToFile(FileName, Str + ", " + Str + "3\r\n", true) // Append to file 
}

//-----------------------------------------------------------------------------
function ProcessExcelDataSheetTest()
{
  var Arr, ParArr;
  
  Arr = ReadExcelDataSheet( DataDir + ExcelFileName, ExcelTableName)
  var length = Arr.length;
  Log.Message("Test Data length = " + length)
  Log.Message("Test Data array [1,1] = " + Arr[1][1])

  ODT.Data.Clear();
  ODT.Classes.Clear();
  NvcDataAccessInit()
  ParArr = ConvertTestDataToProgramData(Arr)
  PrintProgramParameters(ParArr)
}
  
//-----------------------------------------------------------------------------
function ReadExcelDataSheetTest()
{
  var FileName = DataDir + ExcelFileName;
  var Excel
  
  Excel = OpenExcelWorkbook(FileName);
  ReadExcelDataSheet(FileName, "Default"); 
  ReadExcelDataSheet(FileName, "Angular"); 
  CloseExcelWorkbook(Excel);
}

//-----------------------------------------------------------------------------
function ReadExcelDataSheet( excelFileName, excelTableName)
{
  var Driver;
  var RowArr; 
  var TestDataArr = new Array(NumRows);
  var iRows = 0;
  var Excel;
  
  Log.AppendFolder("Read excel data file " + excelFileName + ", sheet " + excelTableName);

//  Excel = OpenExcelWorkbook(excelFileName);

  // Creates the driver
  Driver = DDT.ExcelDriver(excelFileName, excelTableName); 
  if(!Driver.EOF())
  {
//    Driver.Next(); // Skip file header
  }
  else
  {
    Log.Error("Test data sheet could not be opened");
  }  
  
  // Iterates through records
  while (!Driver.EOF())
  {
    iRows = iRows + 1;
    RowArr = ProcessTestData(Driver); // Processes data
    TestDataArr[iRows] = RowArr;
    Driver.Next(); // Goes to the next record
  }
  
//  CloseExcelWorkbook(Excel);

  return TestDataArr;
}
