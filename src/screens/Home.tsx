import { useContext, useEffect, useRef } from 'react';
import BreedsForm from '../components/BreedsForm';
import CatsList from '../components/CatsList';
import BreedsContext from '../context/Breeds';
import CatsContext from '../context/Cats';
import { getAllBreeds } from '../api/cats';

function Home() {
  const { setBreeds, setBreedsError } = useContext(BreedsContext);
  const { setCatId } = useContext(CatsContext);

  const isCalled = useRef(false);

  useEffect(() => {
    setCatId?.('');
    if (!isCalled.current) {
      getAllBreeds()
        .then((data) => {
          isCalled.current = true;
          setBreeds?.(data);
        })
        .catch((err) => {
          setBreedsError?.(err);
        });
      isCalled.current = true;
    }
  }, [isCalled, setBreeds, setBreedsError, setCatId]);

  return (
    <>
      <BreedsForm />
      <CatsList />
    </>
  );
}

export default Home;
