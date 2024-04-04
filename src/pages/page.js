import styles from "../app/page.module.css";
import gstyles from "../app/globals.css";
import Header from "../components/header.jsx";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header/>
      <Link href="/account">
        <button>Go to Account</button>
      </Link>
    </>
  );
}
