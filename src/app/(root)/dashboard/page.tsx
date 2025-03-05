export default function Page() {
  return (
    <div>
      <div className='grid w-full grid-cols-2 gap-4'>
        <div className='grid w-full grid-cols-1 gap-4'>
          <div className='bg-muted col-span-1 h-96 rounded-lg p-4 shadow'></div>
          <div className='bg-muted col-span-1 h-96 rounded-lg p-4 shadow'></div>
        </div>
        <div className='bg-muted col-span-1 h-full rounded-lg p-4 shadow'></div>
        <div className='bg-muted col-span-2 h-[500px] rounded-lg p-4 shadow'></div>
      </div>
    </div>
  );
}
