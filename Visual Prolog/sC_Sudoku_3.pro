/*****************************************************************************

                        Copyright (c) incontact pty ltd

******************************************************************************/

implement sC_Sudoku_3
    open core,matrix

constants
    className = "sC_Sudoku_3".
    classVersion = "".

clauses
    classInfo(className, classVersion).

clauses
    run():-
        console::init(),
        matrix::initialise_matrix(BaseAssignedCellValList,BaseColAvailValList,BaseRowAvailValList,BaseBlockAvailValList,UnAssignedK),
        stdio::write("\n **** initialise_matrix OK  **** \n"),
        matrix::solve(BaseAssignedCellValList,BaseColAvailValList,BaseRowAvailValList,BaseBlockAvailValList,UnAssignedK),
        !,
        stdio::write("\n **** solve OK  **** \n").

    run():-
        stdio::write("\n **** no solution found  **** \n"),
        succeed().
end implement sC_Sudoku_3

goal
    mainExe::run(sC_Sudoku_3::run).
