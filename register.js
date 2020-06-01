var xhr = false;
if (window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();
}
else if (window.ActiveXObject) {
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

function checkInput()
        {
            var x1,x2,x3,x4,x5,x6;
            x1 = document.getElementById("email").value;
            x2 = document.getElementById("firstname").value;
            x3 = document.getElementById("lastname").value;
            x4 = document.getElementById("password").value;
            x5 = document.getElementById("retypepassword").value;
			x6 = document.getElementById("phonenumber").value;
			//alert(x1);

            
            if ((x1 == "" ) || (x2 == "" ) || (x3 == "" ) || (x4 == "" ) || (x5 == "" ))
                { 	
					//document.getElementById("lastname").style.borderColor = "red";
                    alert("All fields must be filled!");
                    //return false;
                }
            
			else if (x4!=x5)
				{
					alert("Passwords do not match!");    
                    //return false;
                }
			else
			{
				//alert("SUCCESS!");
				  //var x6= prompt("Enter phonenumber in the format X-XXX-XXX-XXXX");
				if (x6 != "")
				{
					var regEx= /\(?0[0-9]{1}[\)|\s][0-9]{8}/; 
					if(!regEx.test(x6))
					{
						alert("Phone number format should be 0X XXXXXXXX or (OX)XXXXXXXX");
						
					}
					
					else
					{
						//alert("Valid PhoneNumber " +x6);
						checkDuplicateEmail();
					}
				}
				
				else
				{
					checkDuplicateEmail();
				}
				
                        
			}
		}

function checkDuplicateEmail()
{
	//alert("Going to check for duplicate email");
	var email = document.getElementById('email').value;
	xhr.open("GET", "checkDuplicateEmail.php?email=" + email + "&id=" + Number(new Date), true);
	xhr.send(null);

	xhr.onreadystatechange = function()
	{
		if ((xhr.readyState == 4) && (xhr.status == 200)) 
		{
			var flag = xhr.responseText;
			//alert(xhr.responseText);
			if (flag == "1")
			{
				alert("E-mail ID already in use");
			}
			else
			{
				registration();
			}
		}
		
	}

}	

function registration() 
{
	
	var email = document.getElementById('email').value;
	var firstname = document.getElementById('firstname').value;
	var lastname = document.getElementById('lastname').value;	
	var password = document.getElementById('password').value;
	var retypepassword = document.getElementById('retypepassword').value;
	var phonenumber = document.getElementById('phonenumber').value;
		
	xhr.open("GET", "register.php?email=" + encodeURIComponent(email) + "&firstname=" + firstname + "&lastname=" + lastname + "&password=" + password + "&phonenumber=" + phonenumber + "&id=" + Number(new Date), true);

	xhr.onreadystatechange = testInput;	
	xhr.send(null);
	
}

function testInput() {
	
	if ((xhr.readyState == 4) && (xhr.status == 200)) {
		document.getElementById('msg1').innerHTML = xhr.responseText;
		document.getElementById('msg2').innerHTML = "<a href = \"buyonline.htm\" class=\"btn btn-outline-danger\">Return to BuyOnline Site Map </a>";

		
	}
	
}

