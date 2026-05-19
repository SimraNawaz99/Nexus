import React, { useState } from 'react';
import { Search, Filter, DollarSign, TrendingUp, Users, Calendar } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';

const deals = [
  {
    id: 1,
    startup: {
      name: 'TechWave AI',
      logo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      industry: 'FinTech'
    },
    amount: '$1.5M',
    equity: '15%',
    status: 'Due Diligence',
    stage: 'Series A',
    lastActivity: '2024-02-15'
  },
  {
    id: 2,
    startup: {
      name: 'GreenLife Solutions',
      logo: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
      industry: 'CleanTech'
    },
    amount: '$2M',
    equity: '20%',
    status: 'Term Sheet',
    stage: 'Seed',
    lastActivity: '2024-02-10'
  },
  {
    id: 3,
    startup: {
      name: 'HealthPulse',
      logo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      industry: 'HealthTech'
    },
    amount: '$800K',
    equity: '12%',
    status: 'Negotiation',
    stage: 'Pre-seed',
    lastActivity: '2024-02-05'
  }
];

export const DealsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState([]);

  const statuses = ['Due Diligence', 'Term Sheet', 'Negotiation', 'Closed', 'Passed'];

  const toggleStatus = (status) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Due Diligence':
        return 'primary';
      case 'Term Sheet':
        return 'secondary';
      case 'Negotiation':
        return 'accent';
      case 'Closed':
        return 'success';
      case 'Passed':
        return 'error';
      default:
        return 'gray';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Investment Deals
          </h1>
          <p className="text-gray-600">
            Track and manage your investment pipeline
          </p>
        </div>

        <Button>
          Add Deal
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <Card>
          <CardBody>
            <DollarSign size={20} />
            <p>Total Investment</p>
            <h3>$4.3M</h3>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <TrendingUp size={20} />
            <p>Active Deals</p>
            <h3>8</h3>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Users size={20} />
            <p>Portfolio Companies</p>
            <h3>12</h3>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Calendar size={20} />
            <p>Closed This Month</p>
            <h3>2</h3>
          </CardBody>
        </Card>

      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">

        <div className="w-full md:w-2/3">
          <Input
            placeholder="Search deals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startAdornment={<Search size={18} />}
            fullWidth
          />
        </div>

        <div className="w-full md:w-1/3">
          <div className="flex flex-wrap gap-2 items-center">
            <Filter size={18} />

            {statuses.map((status) => (
              <Badge
                key={status}
                variant={selectedStatus.includes(status) ? getStatusColor(status) : 'gray'}
                className="cursor-pointer"
                onClick={() => toggleStatus(status)}
              >
                {status}
              </Badge>
            ))}
          </div>
        </div>

      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium">Active Deals</h2>
        </CardHeader>

        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">

              <thead>
                <tr className="border-b">
                  <th>Startup</th>
                  <th>Amount</th>
                  <th>Equity</th>
                  <th>Status</th>
                  <th>Stage</th>
                  <th>Last Activity</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {deals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-gray-50">

                    <td>
                      <div className="flex items-center">
                        <Avatar src={deal.startup.logo} size="sm" />
                        <div className="ml-3">
                          <p>{deal.startup.name}</p>
                          <p className="text-sm text-gray-500">
                            {deal.startup.industry}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td>{deal.amount}</td>
                    <td>{deal.equity}</td>

                    <td>
                      <Badge variant={getStatusColor(deal.status)}>
                        {deal.status}
                      </Badge>
                    </td>

                    <td>{deal.stage}</td>

                    <td>
                      {new Date(deal.lastActivity).toLocaleDateString()}
                    </td>

                    <td className="text-right">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </CardBody>
      </Card>

    </div>
  );
};