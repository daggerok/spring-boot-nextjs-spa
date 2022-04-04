import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  // fetch api
  const fetchOptions = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const restApiGet = async (path, fieldName) => {
    const response = await fetch(path, fetchOptions);
    const json = await response.json();
    console.log('json', json);
    return json[fieldName];
  };

  // first name
  const [firstName, setFirstName] = useState();
  useEffect(() => {
    restApiGet('/api/user/first-name', 'firstName')
      .catch(console.error)
      .then(setFirstName);
  }, []);

  // last name
  const [lastName, setLastName] = useState();
  useEffect(() => {
    restApiGet('/api/user/last-name', 'lastName')
      .catch(console.error)
      .then(setLastName);
  }, []);

  return (
    <div>
      <Head>
        <title>Greeting App</title>
        <meta name="description" content="Spring Boot NextJS static pages app"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main>
        <p>Hello, {firstName} {lastName}!</p>
      </main>
    </div>
  );
}
