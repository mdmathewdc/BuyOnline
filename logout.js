function customerManager()
{
	let params = (new URL(document.location)).searchParams;
	let customerid = params.get("customerid");
	let customerName = params.get("customername");
	let manager = params.get("manager");
	if(manager == "null")
	{
		document.getElementById("msg").innerHTML = "Thanks Customer "+customerName + " (" + customerid + ")";
	}
	else
	{
		document.getElementById("msg").innerHTML = "Thanks Manager " + manager;
	}
}