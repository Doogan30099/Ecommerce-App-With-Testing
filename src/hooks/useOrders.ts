import { useQuery } from "@tanstack/react-query";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../context/firebaseConfig";
import type { Order } from "../types/Order";
import type { CartItem } from "../types/Cart";

export const useUserOrders = (userId: string | undefined) => {
  return useQuery<Order[]>({
    queryKey: ["user-orders", userId],
    queryFn: async () => {
      if (!userId) {
        console.log("No userId provided to useUserOrders");
        return [];
      }

      try {
        console.log("Fetching orders for userId:", userId);

        const ordersQuery = query(
          collection(db, "orders"),
          where("userId", "==", userId)
        );

        const querySnapshot = await getDocs(ordersQuery);
        console.log("Found orders:", querySnapshot.size);

        const orders: Order[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            userId: data.userId,
            userName: data.userName,
            userEmail: data.userEmail,
            shippingAddress: data.shippingAddress,
            items: data.items as CartItem[],
            totalAmount: data.totalAmount,
            status: data.status,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          };
        });

        orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

        return orders;
      } catch (error) {
        console.error("Error fetching user orders:", error);
        throw error;
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useOrder = (orderId: string | undefined) => {
  return useQuery<Order | null>({
    queryKey: ["order", orderId],
    queryFn: async () => {
      if (!orderId) return null;

      try {
        const ordersQuery = query(
          collection(db, "orders"),
          where("__name__", "==", orderId)
        );

        const querySnapshot = await getDocs(ordersQuery);

        if (querySnapshot.empty) return null;

        const doc = querySnapshot.docs[0];
        const data = doc.data();

        return {
          id: doc.id,
          userId: data.userId,
          userName: data.userName,
          userEmail: data.userEmail,
          shippingAddress: data.shippingAddress,
          items: data.items as CartItem[],
          totalAmount: data.totalAmount,
          status: data.status,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        };
      } catch (error) {
        console.error("Error fetching order:", error);
        throw error;
      }
    },
    enabled: !!orderId,
  });
};
