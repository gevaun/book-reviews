import client from '@/app/lib/wix'

export default async function Books() {
    
    
    const books = await client.items.queryDataItems({
        dataCollectionId: 'Books',
    })
    .find()
    .then((res) => res.items.map(book => book.data) )
    
    
    console.log(books)

    return (
        <div>
            <h1 className='text-xl font-medium mb-4'>Books</h1>
            <div className='grid grid-cols-4'>
                {books.map(book => (
                    <p key={book?.title}>
                        {book?.title} by {book?.author}
                    </p>
                ))}
            
            </div>
        </div>
    );
}