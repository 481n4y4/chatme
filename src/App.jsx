import AuthForm from "./component/AuthForm";
import { useEffect, useState } from "react";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) =>
      setUser(currentUser)
    );
    return () => unsub();
  }, []);

  return user ? (
    <div>
      <h1>Halo {user.email}</h1>
      <button onClick={() => signOut(auth)}>Logout</button>
    </div>
  ) : (
    <AuthForm />
  );
}

export default App;
