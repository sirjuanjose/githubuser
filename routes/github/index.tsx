import { Head } from "$fresh/runtime.ts";

export default function Page() {
  return (
    <>
      <Head>
        <title>Github Profile</title>
        <meta
          name="description"
          content={`This is a brief description of index`}
        />
      </Head>
      <div class="px-4 py-8 mx-auto bg-[#86efac]">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <a href="/">
            <img
              class="my-6"
              src="/logo.svg"
              width="128"
              height="128"
              alt="the Fresh logo: a sliced lemon dripping with juice"
            />
          </a>
          <h1 class="text-4xl font-bold">Github Profile</h1>
          <p class="my-4">
            Seleccione un perfil de la lista!
          </p>
        </div>
      </div>
    </>
  );
}
