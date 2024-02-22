import { ILoaderState } from '@redux/loaderReducer';
import styles from './Loader.module.scss'
import animation from './loader.json'
import Lottie from 'react-lottie';




export const Loader:React.FC<ILoaderState> = ({isLoading}) => {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };


  
    return (
      <div className={ isLoading ? styles.container : styles.none} data-test-id='loader'>
          <Lottie  options={defaultOptions} height={100} width={100} />;
      </div>
    )
  };