update users 
set is_admin = true 
where id=9
; 

-- TEST SUITE, DON'T TOUCH BELOW THIS LINE --

SELECT * from users WHERE id = 9;
