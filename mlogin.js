var xhr = false;
if (window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();
}
else if (window.ActiveXObject) {
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

function checkManagerLogin()
{
	//alert ("YRAH");
	xhr.open("GET", "checkManagerLogin.php?id=" + Number(new Date), true);
	xhr.send(null);
	xhr.onreadystatechange = function()
	{
		if((xhr.readyState == 4) && (xhr.status == 200))
		{
			//alert(xhr.responseText);
			if(xhr.responseText != "NOTLOGGEDIN")
			{
							document.getElementById('heading').className = 'heading1';
				document.getElementById("description").innerHTML = "Store Manager Portal <a href = \"managerLogout.php\" class = \"btn btn-danger\" style = \"position: absolute; left:1420px; top:33px;\"> Log Out </button>";
							//document.getElementById("managerid").innerHTML = "";
							document.getElementById("listing").innerHTML = "<a href = \"listing.htm\" class=\"btn btn-dark col-md-6\" style=\"margin:8px; \">Listing</button>";
							document.getElementById("listing").innerHTML += "<a href = \"processing.htm\" class=\"btn btn-dark\" style=\"margin:8px; \" >Processing</button>";
							//document.getElementById("logout").innerHTML = "<a href = \"logout.php\" class = \"btn btn-outline-danger\"> Log Out </button>";
							document.getElementById("loginbutton").remove();
							document.getElementById("table").remove();
				
			}
			
			else
			{
				document.getElementById('heading').className = 'heading1';
			}
		}
	}
	
}

function validateManager()
        {
            var x1,x2;
            x1 = document.getElementById("managerid").value;
            x2 = document.getElementById("password").value;

           
            if ((x1 == "" ) || (x2 == "" ))
                { 	
					//document.getElementById("lastname").style.borderColor = "red";
                    alert("All fields must be filled!");
                    //return false;
                }
			else
			{
				//alert("yeah");
				xhr.open("GET", "mlogin.php?managerid=" + x1 + "&password=" + x2 + "&id=" + Number(new Date), true);
				xhr.send(null);

				xhr.onreadystatechange = function()
				{
					if ((xhr.readyState == 4) && (xhr.status == 200)) 
					{
						var flag = xhr.responseText;
						//alert(xhr.responseText);
						
						if(flag == "2")
						{
							alert("Manager Validated!");
							document.getElementById("description").innerHTML = "Store Manager Portal <a href = \"logout.php\" class = \"btn btn-danger\" style = \"position: absolute; left:1420px; top:33px;\"> Log Out </button>";
							//document.getElementById("managerid").innerHTML = "";
							document.getElementById("listing").innerHTML = "<a href = \"listing.htm\" class=\"btn btn-dark col-md-6\" style=\"margin:8px; \">Listing</button>";
							document.getElementById("listing").innerHTML += "<a href = \"processing.htm\" class=\"btn btn-dark\" style=\"margin:8px; \" >Processing</button>";
							//document.getElementById("logout").innerHTML = "<a href = \"logout.php\" class = \"btn btn-outline-danger\"> Log Out </button>";
							document.getElementById("loginbutton").remove();
							document.getElementById("table").remove();


						}
						
						else
						{
							alert(flag);
						}
					}
	
				}					
			}
		}