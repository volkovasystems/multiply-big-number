try{
	var environment = process.env;
	environment = "nodejs";
}catch( error ){
	var environment = "browser";
}
try{
	var base = window;
	environment = "node-webkit";
}catch( error ){
	var base = exports;
}
( function module( base ){
	try{
		var moduleDefine = define; 
	}catch( error ){
		if( environment == "node-webkit" ){
			//It means we can auto reload the requirejs module.
			var fs = require( "fs" );
			var libraryPath = process.cwd( ) + "/library/".replace( "/", path.sep );
			if( fs.existsSync( libraryPath ) ){
				//TODO: Find the script tag containing the requirejs
				var scriptReferenceNode = document.getElementsByTagName( "head" );
				var requirejsScriptLoaderNode = document.createElement( "script" );
				requirejsScriptLoaderNode.setAttribute( "type", "text/javascript" );
				requirejsScriptLoaderNode.setAttribute( "src",
					libraryPath + "require/require.js" );
				scriptReferenceNode.parentNode.insertBefore( requirejsScriptLoaderNode, scriptReferenceNode );
			}
		}
		//TODO: Make this work for nodejs and browser environment.
		var moduleDefine = function define( moduleName, dependencies, moduleConstruct ){
			var parameters = Array.prototype.slice.apply( arguments );
			if( typeof parameters[ 1 ] == "function" ){
				moduleConstruct = parameters[ 1 ];
			}
			moduleConstruct( );
		}
	}
	//TODO: Put the main construction for the module here
	/*:
		@required-environment:
			[
				"nodejs",
				"node-webkit"
			]
		@end-required-environment
	*/
	moduleDefine( "multiplyBigNumber",
		function construct( ){
			var childprocess = require( "child_process" );
			var fs = require( "fs" );
			var path = require( "path" );
			var pathDirectory = process.cwd( ) + "/multiply-big-number/".replace( "/", path.sep );
			var javaClassFile = pathDirectory + "multiplyBigNumber.class";
			var isJavaClassFileExist = fs.existsSync( javaClassFile );

			var multiplyBigNumber = function multiplyBigNumber( numbers, callback ){
				var parameters = Array.prototype.slice.apply( arguments );
				callback = parameters.pop( );
				if( typeof callback != "function" ){
					throw new Error( "invalid parameter" );
				}
				numbers = parameters;
				for( var index = 0; index < numbers.length; index++ ){
					var number = numbers[ index ];
					if( typeof number != "string"
						|| typeof number != "number" )
					{
						throw new Error( "invalid parameter" );
					}
				}
				var command = "java " + pathDirectory + "multiplyBigNumber " + numbers.join( " " );	
				if( !isJavaClassFileExist ){
					command = "javac " + pathDirectory + "multiplyBigNumber.java && " + command;
				}
				var task = childprocess.exec( command );
				var error = "";
				var output = "";
				task.stdout.on( "data",
					function( data ){
						output += data.toString( );
					} );
				task.stderr.on( "data",
					function( data ){
						error += data.toString( ).replace( /^\s+|\s+$/g, "" );
					} );
				task.on( "close",
					function( ){
						if( error ){
							error = new Error( error );
							callback( error );
						}else{
							/*
								TODO: Add validation here that 
								will be returned as second parameter.
							*/
							callback( null, true, output );
						}
					} );
			};
			base.multiplyBigNumber = multiplyBigNumber;
		} );
} )( base );
