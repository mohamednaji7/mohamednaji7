select *, IIF(was_successful, 'No action required', 'Perform an audit' ) as audit 
    from transactions;
    ; 