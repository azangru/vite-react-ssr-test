import styles from './FirstComponent.module.css';

const FirstComponent = () => {
  return (
    <div>
      <h1 className={styles.red}>
        This is my first component
      </h1>
    </div>
  );
};

export default FirstComponent;
