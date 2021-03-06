/*****************************************************************************

                        Copyright (c) incontact pty ltd

******************************************************************************/
class matrix
    open core

domains
    cell = cellVal(integer,integer,integer).
    cellAvailList = cellAvailList(integer,integer*).

predicates
    initialise_matrix : (cell*,cellAvailList*,cellAvailList*,cellAvailList*,integer*) procedure (o,o,o,o,o).

predicates
    solve : (cell*,cellAvailList*,cellAvailList*,cellAvailList*,integer*) nondeterm (i,i,i,i,i).

predicates
    classInfo  :  core::classInfo.

end class matrix