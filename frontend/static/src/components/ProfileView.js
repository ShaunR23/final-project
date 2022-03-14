
function ProfileView(){

    return(
        <div className="h-screen bg-gray-300">
    <div className="container flex justify-center py-20">
        <div className="p-3 bg-white rounded-xl max-w-lg hover:shadow overflow-hidden">
            <div className="flex justify-between w-full"> 
            {/* <img src width="150" className="rounded-lg" /> */}
                <div className="ml-2">
                    <div className="p-3">
                        <h3 className="text-2xl">Shaun</h3> <span>sub text</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-200 rounded-lg">
                        <div className="mr-3"> <span className="text-gray-400 block">Total Right</span> <span className="font-bold text-black text-xl">34</span> </div>
                        <div className="mr-3"> <span className="text-gray-400 block">Total Attempts</span> <span className="font-bold text-black text-xl">940</span> </div>
                        <div> <span className="text-gray-400 block">Percentage or grade?</span> <span className="font-bold text-black text-xl">8.9</span> </div>
                    </div>
                </div>
            </div>
            {/* <div className="flex justify-between items-center mt-2 gap-2"> <button className="w-full h-12 rounded-md border-2 text-md hover:shadow hover:bg-red-700 hover:border-red-700 hover:text-white ">Chat</button> <button className="w-full h-12 rounded-md bg-blue-700 text-white text-md hover:shadow hover:bg-blue-800">Chat</button> </div> */}
        </div>
    </div>
</div>

    )
}

export default ProfileView