select user_id, max(amount) from transactions  
    where user_id = 4
        and recipient_id is null 
    ;