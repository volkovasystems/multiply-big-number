/*:
	@include:
		{
			"work": "work"
		}
	@end-include
*/
multiplyBigNumber = function multiplyBigNumber( numbers, callback ){
	/*:
		@meta-configuration:
			{
				"numbers": "string|number..."
			}
		@end-meta-configuration
	*/
	work( "javac multiplyBigNumber.java && java multiplyBigNumber " + numbers.join( " " ), callback );
};