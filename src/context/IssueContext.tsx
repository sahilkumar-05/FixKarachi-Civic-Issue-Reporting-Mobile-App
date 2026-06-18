import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Issue {
  id: string;
  title: string;
  description?: string;
  location?: string;
  category?: string;
  votes: number;
  status: 'Pending' | 'In Progress' | 'Resolved';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  createdAt: string;
  updatedAt?: string;
  image?: string;
}

interface NewIssue {
  title: string;
  description?: string;
  location?: string;
  category?: string;
}

interface IssueContextType {
  issues: Issue[];
  addIssue: (issue: NewIssue) => void;
  upvote: (id: string) => void;
  updateStatus: (
    id: string,
    status: 'Pending' | 'In Progress' | 'Resolved'
  ) => void;
  deleteIssue: (id: string) => void;
  ADMIN_ID: string;
}

const IssueContext = createContext<IssueContextType | undefined>(undefined);

export const IssueProvider = ({ children }: { children: ReactNode }) => {
  const [issues, setIssues] = useState<Issue[]>([]);

  const ADMIN_ID = 'admin123';

  const getPriority = (
    votes: number
  ): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' => {
    if (votes > 20) return 'CRITICAL';
    if (votes > 10) return 'HIGH';
    if (votes > 5) return 'MEDIUM';
    return 'LOW';
  };

  const addIssue = (issue: NewIssue) => {
    const newIssue: Issue = {
      ...issue,
      id: Date.now().toString(),
      votes: 0,
      status: 'Pending',
      priority: getPriority(0),
      createdAt: new Date().toISOString(),
    };

    setIssues(prev => [newIssue, ...prev]);
  };

  const upvote = (id: string) => {
    setIssues(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newVotes = item.votes + 1;

          return {
            ...item,
            votes: newVotes,
            priority: getPriority(newVotes),
          };
        }

        return item;
      }),
    );
  };

  const updateStatus = (
    id: string,
    status: 'Pending' | 'In Progress' | 'Resolved'
  ) => {
    setIssues(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              status,
              updatedAt: new Date().toISOString(),
            }
          : item,
      ),
    );
  };

  const deleteIssue = (id: string) => {
    setIssues(prev => prev.filter(item => item.id !== id));
  };

  return (
    <IssueContext.Provider
      value={{
        issues,
        addIssue,
        upvote,
        updateStatus,
        deleteIssue,
        ADMIN_ID,
      }}
    >
      {children}
    </IssueContext.Provider>
  );
};

export const useIssues = () => {
  const context = useContext(IssueContext);

  if (!context) {
    throw new Error('useIssues must be used inside IssueProvider');
  }

  return context;
};