import java.math.BigInteger;
public class multiplyBigNumber{
	public static void main( String... numbers ){
		try{
			BigInteger number = new BigInteger( numbers[ 0 ] );
			for( int index = 1; index < numbers.length; index++ ){
				number = number.multiply( new BigInteger( numbers[ index ] ) );	
			}
			System.out.print( number.toString( ) );
		}catch( Exception exception ){
			System.err.print( exception.getMessage( ) );
		}
	}
}