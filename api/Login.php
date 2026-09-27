<?php
    # <?php must be the first in each api file since anything outside the tags gets sent to the browser as output
    # also why it's best practice to not include a closing tag, since anything after will also get sent

	$inData = getRequestInfo();
	
	$id = 0;
	$firstName = "";
	$lastName = "";

	require_once __DIR__ . '/config.php';
	$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("SELECT ID,firstName,lastName FROM Users WHERE Login=? AND Password =?");
		// column names in MySQL are case-insensitive regardless of OS
		$stmt->bind_param("ss", $inData["login"], $inData["password"]);
		$stmt->execute();
		$result = $stmt->get_result();

		if( $row = $result->fetch_assoc()  )
		{
			returnWithInfo( $row['firstName'], $row['lastName'], $row['ID'] );
		}
		else
		{
			returnWithError("No Records Found");
		}

		$stmt->close();
		$conn->close();
	}
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		/*	this function along with returnWithInfo would need to be modified with json_encode(),
			this is to prevent broken JSON when a value contains a double quotes

			the same thing would need to be applied to the returnWithError and returnWithInfo functions
			of AddColor.php and SearchColors.php
		*/
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
