import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MessageCircle,
  Building2,
  MapPin,
  UserCircle,
  BarChart3,
  Briefcase
} from 'lucide-react';

import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { findUserById } from '../../data/users';

export const InvestorProfile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();

  const investor = findUserById(id || '');

  if (!investor || investor.role !== 'investor') {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Investor not found
        </h2>
        <p className="text-gray-600 mt-2">
          The investor profile you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/dashboard/entrepreneur">
          <Button variant="outline" className="mt-4">
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  const isCurrentUser = currentUser?.id === investor.id;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Profile header */}
      <Card>
        <CardBody className="sm:flex sm:items-start sm:justify-between p-6">
          <div className="sm:flex sm:space-x-6">
            <Avatar
              src={investor.avatarUrl}
              alt={investor.name}
              size="xl"
              status={investor.isOnline ? 'online' : 'offline'}
              className="mx-auto sm:mx-0"
            />

            <div className="mt-4 sm:mt-0 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900">
                {investor.name}
              </h1>

              <p className="text-gray-600 flex items-center justify-center sm:justify-start mt-1">
                <Building2 size={16} className="mr-1" />
                Investor • {investor.totalInvestments} investments
              </p>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-3">
                <Badge variant="primary">
                  <MapPin size={14} className="mr-1" />
                  San Francisco, CA
                </Badge>

                {investor.investmentStage.map((stage, index) => (
                  <Badge key={index} variant="secondary" size="sm">
                    {stage}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-0 flex flex-col sm:flex-row gap-2 justify-center sm:justify-end">
            {!isCurrentUser && (
              <Link to={`/chat/${investor.id}`}>
                <Button leftIcon={<MessageCircle size={18} />}>
                  Message
                </Button>
              </Link>
            )}

            {isCurrentUser && (
              <Button variant="outline" leftIcon={<UserCircle size={18} />}>
                Edit Profile
              </Button>
            )}
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">About</h2>
            </CardHeader>
            <CardBody>
              <p className="text-gray-700">{investor.bio}</p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">
                Investment Interests
              </h2>
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap gap-2">
                {investor.investmentInterests.map((interest, index) => (
                  <Badge key={index} variant="primary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">
                Portfolio Companies
              </h2>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {investor.portfolioCompanies.map((company, index) => (
                  <div key={index} className="flex items-center p-3 border rounded-md">
                    <Briefcase size={18} className="mr-3" />
                    <div>
                      <h3 className="text-sm font-medium">{company}</h3>
                      <p className="text-xs text-gray-500">Invested in 2022</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">
                Investment Details
              </h2>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-gray-500">Investment Range</p>
              <p className="font-semibold">
                {investor.minimumInvestment} - {investor.maximumInvestment}
              </p>

              <p className="text-sm text-gray-500 mt-3">Total Investments</p>
              <p className="font-medium">{investor.totalInvestments}</p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Stats</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">

                <div className="p-3 border rounded-md bg-gray-50">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Successful Exits</h3>
                      <p className="text-xl font-bold text-primary-700">4</p>
                    </div>
                    <BarChart3 />
                  </div>
                </div>

                <div className="p-3 border rounded-md bg-gray-50">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Avg ROI</h3>
                      <p className="text-xl font-bold text-primary-700">3.2x</p>
                    </div>
                    <BarChart3 />
                  </div>
                </div>

              </div>
            </CardBody>
          </Card>

        </div>
      </div>
    </div>
  );
};