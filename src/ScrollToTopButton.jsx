function ScrollToTopButton() {
  return (
    <button
      className={`hover: fixed bottom-4 right-4 z-10 h-9 w-9 rounded bg-yellow-600/90 text-lg opacity-60 transition duration-300 hover:opacity-100 lg:h-10 lg:w-10`}
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
    >
      ⬆️
    </button>
  );
}

export default ScrollToTopButton;
