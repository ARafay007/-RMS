import { Spin } from "antd";
import styles from './spinner.module.css';

export const Spinner = () => {

  return (
    <div className={styles.spinnerBackground} >
      <div className={styles.spinner} />
    </div>
  );
}