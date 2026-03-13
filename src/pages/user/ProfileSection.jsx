import { useAuth } from "../../context/AuthContext"
import { StatCard } from "./UserDashboardPage";


export default function ProfileSection(){
  const {user} = useAuth();
  console.log(user);
  const userProfile = user.user;
  const walletProfile = user.wallet

const initials = userProfile.full_name
  .split(' ')
  .map(name => name[0])
  .slice(0,2)
  .join('');

 
  const dateCreatedAccount =new Date(user.wallet.created_on);
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
 const day = dateCreatedAccount.getDate();
const theDate = day < 10 ? `0${day}` : day;
const months = month[dateCreatedAccount.getMonth()];
const year = dateCreatedAccount.getFullYear();
const refinedYearCreated = `${theDate}${determineTitle()} ${months}, ${year}`;

  function determineTitle(){
   
    let title = '';
    const value = day.toString();
    if(value.endsWith('1')){
      title = 'st';
    }
  else if(value.endsWith('2')){
      title = 'nd';
    }
    else if(value.endsWith('3')){
      title = 'rd';
    }
    else{
      title = 'th'
    }
    return title;
  }
 
  console.log(determineTitle())

 
  return(
 <div className="max-w-2xl w-full mx-auto flex flex-col gap-6">
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="bg-cooperative-dark h-24" />
      <div className="px-6 pb-6">
        <div className="flex items-end gap-4 -mt-10 mb-5 flex-wrap">
          <div className="bg-cooperative-orange text-cooperative-cream w-20 h-20 text-2xl font-black rounded-2xl flex items-center justify-center shadow-lg border-4 border-white shrink-0">
               {initials}
          </div>
          <div className="mb-1">
            <p className="font-bold text-xl text-cooperative-dark leading-tight">{userProfile.full_name}</p>
            <p className="text-sm text-gray-400">@{userProfile.username}</p>
          </div>
         
        </div>
        <div className="bg-cooperative-cream rounded-xl p-4 grid grid-cols-2 gap-4">
          {[
            ["Full Name", userProfile.full_name],
            ["Username", `@${userProfile.username}`],
            ["Email", userProfile.email],
            ["Member Since", refinedYearCreated],
            ["Member ID", userProfile.membership_id],
            ['Phone Number', '---'],
            ['Account Number', '---'],
            ['Account Name', '...'],
            ['Location', '...']
          ].map(([k, v]) => (
            <div key={k}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">{k}</p>
              <p className="font-semibold text-sm text-cooperative-dark">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-4">
      <StatCard label="Total Savings" value={`N${walletProfile.balance}`} orange />
     <StatCard label="Active Plans" value="0" />
    </div>
  </div>
  )
  

}
 
