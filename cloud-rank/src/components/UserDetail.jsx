import React, { useState, useEffect } from "react";
import accounts from "../accounts.json";
import calls from "../calls.json";
import email from "../emails.json";

function UserDetail({ user }) {
  const [accountData, setAccountData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (user?.territory) {
      // Ensure the data exists and filter based on territory
      const matchingAccounts = accounts?.filter(
        (account) => account.territory === user.territory
      );

      if (matchingAccounts?.length > 0) {
        const combinedData = matchingAccounts.map((account) => {
          const accountCalls = calls?.filter((call) => call.accountId === account.id);
          const accountEmail = email?.filter((emailItem) => emailItem.accountId === account.id);

          const totalCalls = accountCalls?.length || 0;
          const totalEmails = accountEmail?.length || 0;

          const latestCallDate = accountCalls?.reduce((latest, call) => {
            const callDate = new Date(call.callDate);
            return callDate > latest ? callDate : latest;
          }, new Date(0));

          const latestEmailDate = accountEmail?.reduce((latest, emailItem) => {
            const emailDate = new Date(emailItem.emailDate);
            return emailDate > latest ? emailDate : latest;
          }, new Date(0));

          return {
            accname: account.name,
            totalCalls,
            totalEmails,
            latestCall: latestCallDate,
            latestEmail: latestEmailDate,
          };
        });

        setAccountData(combinedData);
      }
    }
  }, [user]);

  const handleNext = () => {
    if (currentPage < Math.ceil(accountData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = accountData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-4 bg-gray-100 min-h-screen mt-3">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        {user?.userName
          ? `${user.userName}'s Territory Account Details`
          : "User Territory Account Details"}
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full tbl_width table-auto border-collapse border border-gray-300 bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-center">Account Name</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Total Calls</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Total Emails</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Latest Call Date</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Latest Email Date</th>
            </tr>
          </thead>
          <tbody className="txt-cnt">
            {currentData?.map((account, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{account.accname}</td>
                <td className="border border-gray-300 px-4 py-2">{account.totalCalls}</td>
                <td className="border border-gray-300 px-4 py-2">{account.totalEmails}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(account.latestCall).toLocaleString()}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(account.latestEmail).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="btn-flx mt-4 flex justify-center items-center">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="btnnxt px-4 py-2 bg-blue-500 text-white rounded-l hover:bg-blue-700"
        >
          previous
        </button>

        <span className="px-4 py-2 text-gray-800">
          {`Page ${currentPage} / ${Math.ceil(accountData.length / itemsPerPage)}`}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === Math.ceil(accountData.length / itemsPerPage)}
          className="btnnxt px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UserDetail;
