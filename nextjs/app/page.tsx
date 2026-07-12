import Button from "@/components/button";
import Image from "next/image";

export default async function Home() {
  const res = await fetch("https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=10");
  const data = await res.json();
  console.log(data);
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello World</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque tempore architecto doloremque quasi facilis expedita porro voluptas neque? Adipisci veniam quidem hic enim, cum recusandae quasi mollitia harum id unde maiores architecto repudiandae libero natus eos, accusamus necessitatibus, quam tenetur.
      </p>
      <Button />
    </div>
  );
}
