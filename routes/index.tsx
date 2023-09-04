import { useSignal } from "@preact/signals";
import { Head } from "$fresh/runtime.ts";

export default function Home() {
  const count = useSignal(3);

  return (
    <>
      <Head>
        <title>Fresh: Github Profile</title>
        <meta
          name="description"
          content={`This is a brief description of index`}
        />
      </Head>
      <div class="px-4 py-8 mx-auto bg-[#86efac]">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <img
            class="my-6"
            src="/logo.svg"
            width="128"
            height="128"
            alt="the Fresh logo: a sliced lemon dripping with juice"
          />
          <h1 class="text-4xl font-bold">Welcome to <a href="/github">Github Profile</a></h1>
        </div>
      </div>
    </>
  );
}
