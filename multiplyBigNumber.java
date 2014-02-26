import java.math.BigInteger;
public class multiplyBigNumber{
	public static void main( String... numbers ){
		try{
			BigInteger number = BigInteger.ONE;
			for( int index = 0; index < numbers.length; index++ ){
				number = number.multiply( new BigInteger( numbers[ index ] ) );	
			}
			System.out.print( number.toString( ) );
		}catch( Exception exception ){
			System.err.print( exception.getMessage( ) );
		}
	}
}