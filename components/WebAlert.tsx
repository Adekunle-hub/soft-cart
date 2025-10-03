import React, { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { removeAlert } from "@/store/cartSlice";

const WebAlert = () => {
  const alerts = useSelector((state: RootState) => state.cart.alerts);

  return (
    <div className="fixed top-[1rem] left-1/2 items-center justify-center transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1 z-50">
      {alerts.map((alert, index) => (
        <SingleAlert
          key={alert.id}
          id={alert.id}
          message={alert.message}
          index={index}
        />
      ))}
    </div>
  );
};

function SingleAlert({
  id,
  message,
  index,
}: {
  id: number;
  message: string;
  index: number;
}) {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setVisible(true);
    
    }, 50);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 4000);
    return () => clearTimeout(hideTimer);
  }, []);

  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(() => dispatch(removeAlert(id)), 3000);
      return () => clearTimeout(timer);
    }
  }, [id, dispatch, visible]);

  return (
    <Alert
      className="bg-white w-[8rem] md:w-[11rem]  max-w-xs shadow-2xl ease-in-out  mx-auto transition-transform duration-300"
      variant="default"
      style={{
        transform: visible
          ? `translateY(${(index * 10) / 5}px)`
          : `translateY(${index * 30 - 3000}px)`,
        position: "absolute",
        top: `${index * 50}px`,
       
        translate: "translateX(-50%)",
      }}
    >
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
}
export default WebAlert;
