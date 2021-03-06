! cycles through Monte Carlo files in a given directory
! and reads out an OPEV for each file
! NOTE: this assumes that the files are in the MC_T####.zpl format
! MRH 2016-07-29

SUSPENDUPDATES
FORMAT 10.4
BROWSE "Enter the MC files you want", s$, 0, ".zmx"		# Dialog window to input the name of seq-file
filter$ = "MC_T*.zmx" # change this if you have a custom prefix to the MC files

IF SLEN(s$) == 0 THEN END

! stores a temporary location of the current file
orig$ = $FILEPATH()

! determines the parent folder
LABEL folder
r$ = $RIGHTSTRING(s$,1)
IF (r$ $!= "\") 
	s$ = $LEFTSTRING(s$,SLEN(s$)-1)
	GOTO folder
ENDIF

! creates filter for the FINDFILE keyword
filter$ = s$ + filter$

! prints header information
PRINT "Execution Date: ",$DATE()
PRINT "Parent folder:  ",$LEFTSTRING(s$,SLEN(s$)-1)
PRINT

PRINT "FILE                 EFL"

! creates loop for gettings all the files in a folder
FINDFILE file$, filter$
LABEL file
IF (SLEN(file$))

	! creates the full file name
	fullFile$ = s$ + file$
	! loads lens and waits for all threads to update
	LOADLENS fullFile$
	!UPDATE EDITORS
	PAUSE THREADS
	
	!------------CUSTOM CODE----------------
	! extracts MFE values
    PRINT file$, "  |  ", OPEV(OCOD("EFFL"),0,0,0,0,0,0)
	!-------END OF CUSTOM CODE--------------
	
	PAUSE THREADS	
	FINDFILE file$, filter$
	GOTO file
ENDIF

! restores original file
LOADLENS orig$
RESUMEUPDATES
