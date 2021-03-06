/*****************************************************************************

                        Copyright (c) incontact pty ltd

******************************************************************************/

/*****************************************************************************

                        Copyright (c) incontact pty ltd

******************************************************************************/

implement matrix
    open core, std, list

class facts
    xLengthMin : integer := erroneous.
    kMin : integer := erroneous.
    kMinAvailCellVals : integer* := erroneous.

class facts - initCellVal
    basevalue : (integer Col, integer Row, integer Val) nondeterm.

clauses
    initialise_matrix(BaseAssignedCellList, BaseColAvailList, BaseRowAvailList, BaseBlockAvailList, UnAssignedK) :-
        retractFactDB(initCellVal),
        file::consult("../sudoki_problem.txt",initCellVal),
        % find the initial list of cellVal corresp to basevalue
        %stdio::write("\n\n"),
        BaseAssignedCellList = [ cellVal(K, N, 0) || basevalue(I, J, N), cell_index(K, I, J, _) ],
        %stdio::write("\n\n", BaseAssignedCellList),
        % now construct the list of available candidate values for each of 9 rows, 9 columns and 9 blocks
        %stdio::write("\n\n", "now construct the list of available candidate values for each of 9 rows, 9 columns and 9 blocks"),
        baseAvailCellLists(BaseColAvailList, BaseRowAvailList, BaseBlockAvailList),
        %stdio::write("\n\n BaseColAvailList \n", BaseColAvailList),
        %stdio::write("\n\n BaseRowAvailList \n", BaseRowAvailList),
        %stdio::write("\n\n BaseBlockAvailList \n", BaseBlockAvailList),
        AssignedK = [ KA || basevalue(I1, J2, _), cell_index(KA, I1, J2, _) ],
        UnAssignedK = [ K2 || K2 = fromTo(1, 81), not(isMember(K2, AssignedK)) ],
        %stdio::write("\n\n UnAssignedK \n", UnAssignedK),
        %stdio::write("\n\n ** initialise_matrix success OK ** \n"),
        succeed.

clauses
    solve(AssignedCellList1, _ColAvailLists1, _RowAvailLists1, _BlockAvailLists1, UnAssignedK1) :-
        UnAssignedK1 = [],
        !,
        stdio::write("\n\n *** solution - reversed order solved *** \n\n", AssignedCellList1),
        stdio::write("\n\n *** solution - sorted *** \n\n"),
        SortedCellList=list::sortBy(compareVal,AssignedCellList1),
        stdio::write(SortedCellList),
         stdio::write("\n\n *** solution - matrix form *** \n\n"),
        foreach(Row=fromto(1,9)) do
            stdio::write("\n"),
            if Row rem 3 = 1 then stdio::write(string::create(13,"-"),"\n") end if,
        foreach(Col=fromto(1,9)) do
            Index=(Row-1)*9+Col-1,
            Col_rem_3=Col rem 3,
            if (Col_rem_3 = 1) then stdio::write("|") end if,
            nth(Index,SortedCellList)=cellVal(_,SolnCellVal,_),   stdio::write(SolnCellVal),
            if (Col=9) then stdio::write("|") end if
        end foreach,
             if Row = 9 then stdio::write("\n",string::create(13,"-"),"\n") end if
        end foreach.
    solve(AssignedCellList, ColAvailLists, RowAvailLists, BlockAvailLists, UnAssignedK) :-
        xLengthMin:= 99,
        selectBestK(ColAvailLists, RowAvailLists, BlockAvailLists, UnAssignedK, KBest, KBestAvailCellVals),
        cell_index(KBest, Col, Row, Block),
        Val = getMember_nd(KBestAvailCellVals),
            cellAvailList(Col, List1) = nth(Col, ColAvailLists),
            cellAvailList(Row, List2) = nth(Row, RowAvailLists),
            cellAvailList(Block, List3) = nth(Block-1, BlockAvailLists),
            setNth(Col, ColAvailLists, cellAvailList(Col, remove(List1, Val)), ColAvailLists1),
            setNth(Row, RowAvailLists, cellAvailList(Row, remove(List2, Val)), RowAvailLists1),
            setNth(Block-1, BlockAvailLists, cellAvailList(Block, remove(List3, Val)), BlockAvailLists1),
        UnAssignedK1 = remove(UnAssignedK, KBest),
        AssignedCellList1 = [cellVal(KBest, Val, 1)|AssignedCellList],
        solve(AssignedCellList1, ColAvailLists1, RowAvailLists1, BlockAvailLists1, UnAssignedK1).

class predicates
    selectBestK : (cellAvailList*, cellAvailList*, cellAvailList*, integer*, integer, integer*) nondeterm (i,i,i,i,o,o).
clauses
    %NB: need to assign value to gloabal var xLengthMin before calling selectBestK eg. xLengthMin:= 99
    selectBestK(_ColAvailLists, _RowAvailLists, _BlockAvailLists, [], KBest, KBestAvailCellVals) :-
        !,
        %terminate recursion
        KBest = kMin, KBestAvailCellVals = kMinAvailCellVals.
        %stdio::write("\n ** KBest = ", KBest ), stdio::write("\n ** KBestAvailCellVals = ", KBestAvailCellVals ).
    selectBestK(_ColAvailLists, _RowAvailLists, _BlockAvailLists, _UnAssignedK, KBest, KBestAvailCellVals) :-
        %terminate recursion if length of kMinAvailCellVals list = 1
        % return values for KBest and KBestAvailCellVals back up through the recursion calls to the original call.
        xLengthMin = 1, !, KBest = kMin, KBestAvailCellVals = kMinAvailCellVals.
        %stdio::write("\n ** KBest = ", KBest ), stdio::write("\n ** KBestAvailCellVals = ", KBestAvailCellVals ).
    selectBestK(ColAvailLists, RowAvailLists, BlockAvailLists, UnAssignedK, KBest, KBestAvailCellVals) :-
        %xLengthMin:= 99, kMin := 99, kMinAvailCellVals:= [],
        UnAssignedK = [K|UnAssignedK1],
            if xLengthMin>1 then
                cell_index(K, Col, Row, Block),
                cellAvailList(Col, List1) = nth(Col, ColAvailLists),
                cellAvailList(Row, List2) = nth(Row, RowAvailLists),
                cellAvailList(Block, List3) = nth(Block-1, BlockAvailLists),
                KAvailCellVals = [ Val || Val = getMember_nd(List1), isMember(Val, List2), isMember(Val, List3) ],
                if length(KAvailCellVals) < xLengthMin then %set global variables
                    kMin:= K,
                    xLengthMin := length(KAvailCellVals),
                    kMinAvailCellVals := KAvailCellVals
                    %stdio::write("\n ** kMin = ", kMin ), stdio::write("\n ** kMinAvailCellVals = ", kMinAvailCellVals )
                end if
            end if,
        selectBestK(ColAvailLists, RowAvailLists, BlockAvailLists, UnAssignedK1, KBest, KBestAvailCellVals).

class predicates
    baseAvailCellLists : (cellAvailList* BaseColAvailList, cellAvailList* BaseRowAvailList, cellAvailList* BaseBlockAvailList) procedure (o,o,o).
clauses
    baseAvailCellLists(BaseColAvailList, BaseRowAvailList, BaseBlockAvailList) :-
        BaseColAvailList = [ cellAvailList(Col, baseColAvailVal(Col)) || Col = fromTo(0, 8) ],
        BaseRowAvailList = [ cellAvailList(Row, baseRowAvailVal(Row)) || Row = fromTo(0, 8) ],
        BaseBlockAvailList = [ cellAvailList(Block, baseBlockAvailVal(Block)) || Block = fromTo(1, 9) ].

class predicates
    baseColAvailVal : (integer Col) -> integer* ListAvail.
clauses
    baseColAvailVal(Col) = ListAvail :-
        List2 = [ Val1 || basevalue(Col, _, Val1) ],
        ListAvail = [ Val || Val = fromTo(1, 9), not(isMember(Val, List2)) ].

class predicates
    baseRowAvailVal : (integer Row) -> integer* ListAvail.
clauses
    baseRowAvailVal(Row) =ListAvail :-
        List2 = [ Val1 || basevalue(_, Row, Val1) ],
        ListAvail = [ Val || Val = fromTo(1, 9), not(isMember(Val, List2)) ].

class predicates
    baseBlockAvailVal : (integer Block) -> integer* ListAvail.
clauses
    baseBlockAvailVal(Block) = ListAvail :-
        List2 = [ Val1 || cell_index(_, Col, Row, Block), basevalue(Col, Row, Val1) ],
        ListAvail = [ Val || Val = fromTo(1, 9), not(isMember(Val, List2)) ].

class predicates
    cell_index : (integer Linear, integer Col, integer Row, integer Block) nondeterm anyflow.
clauses
    cell_index(1,0,0,1).
    cell_index(2,1,0,1).
    cell_index(3,2,0,1).
    cell_index(4,3,0,2).
    cell_index(5,4,0,2).
    cell_index(6,5,0,2).
    cell_index(7,6,0,3).
    cell_index(8,7,0,3).
    cell_index(9,8,0,3).
    cell_index(10,0,1,1).
    cell_index(11,1,1,1).
    cell_index(12,2,1,1).
    cell_index(13,3,1,2).
    cell_index(14,4,1,2).
    cell_index(15,5,1,2).
    cell_index(16,6,1,3).
    cell_index(17,7,1,3).
    cell_index(18,8,1,3).
    cell_index(19,0,2,1).
    cell_index(20,1,2,1).
    cell_index(21,2,2,1).
    cell_index(22,3,2,2).
    cell_index(23,4,2,2).
    cell_index(24,5,2,2).
    cell_index(25,6,2,3).
    cell_index(26,7,2,3).
    cell_index(27,8,2,3).
    cell_index(28,0,3,4).
    cell_index(29,1,3,4).
    cell_index(30,2,3,4).
    cell_index(31,3,3,5).
    cell_index(32,4,3,5).
    cell_index(33,5,3,5).
    cell_index(34,6,3,6).
    cell_index(35,7,3,6).
    cell_index(36,8,3,6).
    cell_index(37,0,4,4).
    cell_index(38,1,4,4).
    cell_index(39,2,4,4).
    cell_index(40,3,4,5).
    cell_index(41,4,4,5).
    cell_index(42,5,4,5).
    cell_index(43,6,4,6).
    cell_index(44,7,4,6).
    cell_index(45,8,4,6).
    cell_index(46,0,5,4).
    cell_index(47,1,5,4).
    cell_index(48,2,5,4).
    cell_index(49,3,5,5).
    cell_index(50,4,5,5).
    cell_index(51,5,5,5).
    cell_index(52,6,5,6).
    cell_index(53,7,5,6).
    cell_index(54,8,5,6).
    cell_index(55,0,6,7).
    cell_index(56,1,6,7).
    cell_index(57,2,6,7).
    cell_index(58,3,6,8).
    cell_index(59,4,6,8).
    cell_index(60,5,6,8).
    cell_index(61,6,6,9).
    cell_index(62,7,6,9).
    cell_index(63,8,6,9).
    cell_index(64,0,7,7).
    cell_index(65,1,7,7).
    cell_index(66,2,7,7).
    cell_index(67,3,7,8).
    cell_index(68,4,7,8).
    cell_index(69,5,7,8).
    cell_index(70,6,7,9).
    cell_index(71,7,7,9).
    cell_index(72,8,7,9).
    cell_index(73,0,8,7).
    cell_index(74,1,8,7).
    cell_index(75,2,8,7).
    cell_index(76,3,8,8).
    cell_index(77,4,8,8).
    cell_index(78,5,8,8).
    cell_index(79,6,8,9).
    cell_index(80,7,8,9).
    cell_index(81,8,8,9).

constants
    className = "matrix/matrix".
    classVersion = "".
clauses
    classInfo(className, classVersion).

class predicates
    compareVal:comparator {cell }.
clauses
    %compareVal(A1,A2)  = less() :- A1=cellVal(Val1,_,_),A2=cellVal(Val2,_,_),Val1 < Val2.
    compareVal(cellVal(Val1,_,_),cellVal(Val2,_,_))  = less() :- Val1 < Val2,!.
    compareVal(cellVal(Val1,_,_),cellVal(Val2,_,_))  = equal() :- Val1 = Val2,!.
    compareVal(cellVal(Val1,_,_),cellVal(Val2,_,_))  = greater() :- Val1 > Val2,!.
    compareVal(_A1,_A2) = equal().

end implement matrix
