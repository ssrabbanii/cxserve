import { auth, db } from "@/firebase";
import { TimepassUser } from "@/types/models/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore/lite";
import { useNavigate } from "react-router-dom";

// Registration

interface UserInput extends TimepassUser {
  password: string;
}

const registerUser = async ({
  email,
  password,
  name,
  phone,
}: UserInput) => {
  // Create User account
  const userCredentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // Save additional User info in Firestore
  await setDoc(doc(db, "users", userCredentials.user.uid), {
    name: name,
    phone: phone,
    email: email,
    createdAt: new Date(),
  });
};

export const useRegisterUser = (redirect: Boolean) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      if (redirect) navigate("/");
    },
    onError: (err) => {
      console.error("Error registering user:", err.message);
    },
  });
};

// Sign In

const signInUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const useSignInUser = (redirect: Boolean) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signInUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      if (redirect) navigate("/");
    },
    onError: (err) => {
      console.error("Error signing in user:", err.message);
    },
  });
};

// Sign Out

const signOutUser = async () => {
  return await signOut(auth);
};

export const useSignOutUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signOutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      console.error("Error signing out user:", err.message);
    },
  });
};
