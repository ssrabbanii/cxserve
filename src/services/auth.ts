import { auth, db } from "@/firebase";
import { TimepassManager } from "@/types/models/manager";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore/lite";
import { useNavigate } from "react-router-dom";

//

// Registration

interface ManagerInput extends TimepassManager {
  password: string;
}

const registerManager = async ({
  email,
  password,
  name,
  phone,
}: ManagerInput) => {
  // Create manager account
  const userCredentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // Save additional manager info in Firestore
  await setDoc(doc(db, "managers", userCredentials.user.uid), {
    name: name,
    phone: phone,
    email: email,
    createdAt: new Date(),
  });
};

export const useRegisterManager = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registerManager,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["manager"] });
      navigate("/");
    },
    onError: (err) => {
      console.error("Error registering user:", err.message);
    },
  });
};

// Sign In

const signInManager = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  // Create manager account
  return await signInWithEmailAndPassword(auth, email, password);
};

export const useSignInManager = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signInManager,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["manager"] });
      navigate("/");
    },
    onError: (err) => {
      console.error("Error signing in user:", err.message);
    },
  });
};

// Sign Out

const signOutManager = async () => {
  return await signOut(auth);
};

export const useSignOutManager = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signOutManager,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["manager"] });
      navigate("/login");
    },
    onError: (err) => {
      console.error("Error signing out user:", err.message);
    },
  });
};
