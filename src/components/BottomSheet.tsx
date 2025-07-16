function BottomSheet() {
  return (
    <>
      <div className="fixed w-full  bg-black/20  inset-0 z-40"></div>
      <div className="fixed bg-red-500 w-full h-2/3 bottom-0 z-50 left-1/2 -translate-x-1/2 rounded-t-4xl pt-2 p-5">
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-gray-300" />
        <div className="w-full h-full bg-gray-500"></div>
      </div>
    </>
  );
}

export default BottomSheet;
