import Image from "next/image";
import styles from "./page.module.css";
import Goals from "./goals/page";
import { redirect } from "next/navigation";


export default function Home() {
  redirect("/login");
}
