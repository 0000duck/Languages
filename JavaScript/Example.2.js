// Global variables
var i_ExportFile, i_ExportFileName;

function strrep( character, count )
{
  var str = "";
  for( var i = 0; i < count; i++ ) str += character;
  return str;
}

// Exporting text
function SaveText( ALogData )
{
  i_ExportFile.WriteLine( "Text: " + ALogData.Text); 
}

// Exporting table data
function SaveTable( ALogData )
{
  // Obtaining the table scheme
  var TableScheme = ALogData.Scheme; 
  // Getting the number of table columns 
  var ColCount = TableScheme.ColumnCount;
  // Getting the number of child tables
  var ChildCount = TableScheme.ChildCount; 

  // Iterating through table records and exporting table data
  for ( var i = 0; i < ALogData.RowCount; i++ )
  {
    var j;
    
    // Obtaining the row object
    var Row = ALogData.Rows( i);
    
    // Exporting column data
    var s = "Row " + VarToStr( i + 1) + ":\t";
    for ( j = 0; j < ColCount; j++ ) 
      s = s + VarToStr( Row.ValueByIndex( j)) + "\t";
    i_ExportFile.WriteLine( s); // Writing data to file
    
    // Exporting child tables data 
    for ( j = 0; j < ChildCount; j++ )
    {
      var Child = Row.ChildDataByIndex( j);
      SaveLogData( Child);
    }
  }
}

// Exporting log item's data
function SaveLogData( ALogData )
{ 
  var Scheme = ALogData.Scheme;
  
  // Exporting the scheme name
  i_ExportFile.WriteBlankLines( 1);
  i_ExportFile.WriteLine( "Name: " + Scheme.Name); 
  i_ExportFile.WriteLine( strrep( '-', 80));
  
  // Determining the type of log item"s data and 
  // exporting the data
  switch ( Scheme.DataType )
  {
    case ldtTable: 
      SaveTable( ALogData); // Exporting table data
      break; 
    case ldtText: 
      SaveText( ALogData); // Exporting text
      break;
  }
}

// Exporting log items
function SaveLogItem( ALogItem )
{
  var i;

  // Exporting log item's data
  for( i = 0; i < ALogItem.DataCount; i++ ) 
    SaveLogData( ALogItem.Data( i));

  // Exporting child log items 
  for( i = 0; i < ALogItem.ChildCount; i++ ) 
    SaveLogItem( ALogItem.Child( i));
}

function SaveResultsAsTAP( FileName )
{
  if ( Project.Logs.LogItemsCount > 0 )
  {
    // Initializing variables
    i_ExportFileName = FileName;

    // Creating file
    var FS = Sys.OleObject( "Scripting.FileSystemObject")
    i_ExportFile = FS.CreateTextFile( i_ExportFileName, true);

    // Exporting the test log contents
    try
    {
      for( var i = 0; i < Project.Logs.LogItemsCount; i++ ) 
        SaveLogItem( Project.Logs.LogItem( i));
    }
    finally
    {
      i_ExportFile.Close();
    } 
  }
  else
    // If the project does not contain log items,
    // post a message about this to the test log
    Log.Message( "No logs for export."); 
}

function SaveResultsAs( FileName, LogFormat )
{
  if ( LogFormat > 3 )
  {
    Log.Error( "Invalid log format (" + LogFormat +") specified.");
    return;
  }
  var fullFileName =  Project.ConfigPath + "Log\\" + FileName;
  switch ( LogFormat )
  {
  case  0: fullFileName += ".xml"; break; // eXtensible Markup Langauge
  case  1: fullFileName += ".htm"; break; // HyperText Markup Language (.html) 
  case  2: fullFileName += ".mht"; break; // MIME HTML 
  case  3: fullFileName += ".tap"; break; // Test Anything Protocol
  default: 
    Log.Error( "UNREACHABLE.");
    break;
  }
  
  switch ( LogFormat )
  {
  case  3:
    SaveResultsAsTAP( fullFileName ); 
    break;
  default:
    Log.SaveResultsAs( fullFileName, LogFormat); 
    break; 
  }
}
