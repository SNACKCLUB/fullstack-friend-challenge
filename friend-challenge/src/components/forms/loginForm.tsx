export default function LoginForm() {
  return (
    <form action="" className="flex flex-col gap-4 w-[80%] text-sm">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="">
          Email
        </label>
        <input
          type="email"
          className="h-[40px] px-4 rounded-md bg-gray-950/50 outline-none focus:outline-red-400"
          name="email"
          id="email"
          placeholder="Your email"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="">
          Password
        </label>
        <input
          type="password"
          className="h-[40px] px-4 rounded-md bg-gray-950/50 outline-none focus:outline-red-400"
          name="password"
          id="password"
          placeholder="Your password"
          required
        />
      </div>
      <div className="py-4">
        <button
          className="bg-gray-800 w-full h-[40px] rounded-md outline-none hover:outline-red-400"
          type="submit"
        >
          Login
        </button>
      </div>
    </form>
  );
}
