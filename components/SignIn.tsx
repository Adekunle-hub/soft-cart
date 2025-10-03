"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { assets, BagIcon, LogOutIcon } from "@/assets/assets";
import { Input } from "./ui/input";
import { supabase } from "@/utils/supabase/supabase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { setUser } from "@/store/AuthSlice";

import { init } from "next/dist/compiled/webpack/webpack";
import { useRouter } from "next/navigation";

interface signInProps {
  showSignIn: boolean;
  setShowSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn: React.FC<signInProps> = ({ showSignIn, setShowSignIn }) => {
  const dispatch = useDispatch();
  const { user, userLoggedIn } = useSelector((state: RootState) => state.auth);

  const route = useRouter();

  const initialForm = {
    name: "",
    email: "",
    password: "",
  };
  const [signedIn, setSignedIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [formDetails, setFormDetails] = useState(initialForm);
  

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        dispatch(setUser(data.user));
      }
    };

    checkSession();
  }, [dispatch]);

  useEffect(() => {
    if (showSignIn) setFormDetails(initialForm);
  }, [showSignIn]);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formDetails.email,
      password: formDetails.password,
    });
    if (error) {
      const res = await fetch("/api/check-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formDetails.email,
        }),
      });

      const { exists } = await res.json();

      if (exists) {
        setErrorMsg("Incorrect username or password, please try again!");
      } else {
        setErrorMsg("No Account Found with this mail, please sign up...");
        setTimeout(() => setSignUp(true), 2000);
      }
      setLoading(false);
    } else if (data.user) {
      const fullName = data.user.user_metadata?.fullName;

      dispatch(
        setUser({
          ...data.user,
          full_name: fullName,
        })
      );

      setShowSignIn(false);
      setLoading(false);
      setFormDetails(initialForm);
    }
  };

  const handleSignInWithGoogle = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_SITE_URL,
      },
    });
    if (error) console.error("Error", error);
    else {
      console.group("Redirecting");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Unable to sign out");
    } else {
      dispatch(setUser(null));
      setFormDetails(initialForm);
      route.push("/");
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { data, error } = await supabase.auth.signUp({
        email: formDetails.email,
        password: formDetails.password,
        options: {
          data: {
            fullName: formDetails.name,
          },
        },
      });
      if (error) {
        console.error("Error signing up", error.message);
        setErrorMsg(error.message);
      } else {
        if (data.user?.identities?.length === 0) {
          setErrorMsg(
            "This email is already registered. Please sign in instead."
          );
        } else {
          setSuccessMsg(
            "Sign-up successful! Please check your email to confirm your account."
          );
        }
      }
    } catch (error) {
      setErrorMsg("Something went wrong.Please try again");
    }
  };

  return (
    <section className="relative">
      {showSignIn && user ? (
        <main className="absolute z-500 flex flex-col gap-4 bg-white right-4 top-2 md:-top-3 md:right-38 border-gray-300 border-1 rounded-[10px] p-4 w-[20rem] h-[14rem] ">
          <div className="flex items-center  gap-3">
            <span className="h-8 w-8 flex items-center justify-center text-white font-medium rounded-full bg-primary">
              {user?.email ? user.email.charAt(0).toUpperCase() : ""}
            </span>
            <div>
              <h4 className="text-[14px] p-0 m-0 font-medium">
                {user?.user_metadata?.fullName || ""}
              </h4>
              <p className="text-sm">{user.email}</p>
            </div>
          </div>
          <div
            onClick={() => route.push("/cart")}
            className="flex items-center cursor-pointer gap-3"
          >
            <span className="h-8 w-8 flex items-center justify-center">
              <Image src={assets.cart_icon} alt="cart" />
            </span>
            <h4>Cart</h4>
          </div>
          <div className="flex items-center cursor-pointer gap-3">
            <span className="h-8 w-8 flex items-center justify-center">
              <BagIcon />
            </span>
            <h4>My Orders</h4>
          </div>
          <Button
            size="soft"
            onClick={handleSignOut}
            className="flex items-center justify-start !p-0 bg-transparent hover:bg-transparent cursor-pointer  gap-3"
          >
            <span className="h-8 w-8 flex items-center justify-center">
              <LogOutIcon />
            </span>
            <h4>Sign out</h4>
          </Button>
        </main>
      ) : (
        <main className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <section
            className="w-[400px] relative min-h-[80lvh]  bg-white text-white
                   flex flex-col gap-4
                   rounded-xl px-6 py-9 shadow-xl"
          >
            <span
              className="absolute font-medium hover:bg-gray-300 px-2 cursor-pointer py-1 rounded-[3px] right-2 top-2 text-sm text-gray-500/50"
              onClick={() => setShowSignIn(false)}
            >
              X
            </span>
            {signUp ? (
              <div className="text-center  text-black font-medium">
                <h3>Welcome to QuickCart Ecommerce</h3>
                <p className="text-gray-500/50 text-sm">
                  Kindly create a new account
                </p>
              </div>
            ) : (
              <div className="text-center  text-black font-medium">
                <h3>Sign in to QuickCart Ecommerce</h3>
                <p className="text-gray-500/50 text-sm">
                  Welcome back! Please sign in to continue
                </p>
              </div>
            )}

            <Button
              onClick={handleSignInWithGoogle}
              className="bg-white border cursor-pointer border-gray-300 mt-4 shadow-2xs hover:bg-white text-black"
            >
              <Image
                src={assets.googlemail}
                alt="g-mail"
                width={20}
                height={20}
              />
              Continue with Google
            </Button>

            <span className="text-center">or</span>
            {signUp ? (
              <form onSubmit={handleSignUp} className=" flex flex-col gap-4">
                <div>
                  <label className="text-sm font-medium text-black">Name</label>
                  <Input
                    name="name"
                    className="rounded-[5px] py-1 text-black"
                    placeholder="John Doe"
                    type="name"
                    value={formDetails.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-black">
                    Email Address
                  </label>
                  <Input
                    name="email"
                    className="rounded-[5px] py-1 text-black"
                    placeholder="Enter your email address"
                    type="email"
                    value={formDetails.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-black">
                    Password
                  </label>
                  <Input
                    name="password"
                    className="rounded-[5px] py-1 text-black"
                    placeholder="Enter your password"
                    type="password"
                    value={formDetails.password}
                    onChange={handleChange}
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-gray-900 hover:bg-gray-900 cursor-pointer"
                >
                  {loading ? "Creating your account...." : "Create Account"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-black">
                    Email Address
                  </label>
                  <Input
                    name="email"
                    className="rounded-[5px] py-1 text-black"
                    placeholder="Enter your email address"
                    type="email"
                    value={formDetails.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-black">
                    Password
                  </label>
                  <Input
                    name="password"
                    className="rounded-[5px] py-1 text-black"
                    placeholder="Enter your password"
                    type="password"
                    value={formDetails.password}
                    onChange={handleChange}
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-gray-900 hover:bg-gray-900 cursor-pointer"
                >
                  {loading ? "Signing in...." : "Sign In"}
                </Button>
              </form>
            )}

            {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
            {successMsg && (
              <p className="text-green-600 text-sm">{successMsg}</p>
            )}
            <span className="text-center text-sm text-black">
              {signUp ? "Already have an account?" : " Don't have an account?"}

              <Button
                onClick={() => setSignUp((prevSignUp) => !prevSignUp)}
                className="bg-transparent p-2 cursor-pointer hover:bg-transparent"
              >
                {signUp ? "Sign in" : "Sign up"}
              </Button>
            </span>
          </section>
        </main>
      )}
    </section>
  );
};

export default SignIn;
