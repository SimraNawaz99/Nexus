import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, PieChart, Filter, Search, PlusCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { EntrepreneurCard } from '../../components/entrepreneur/EntrepreneurCard';
import { useAuth } from '../../context/AuthContext';
import { entrepreneurs } from '../../data/users';
import { getRequestsFromInvestor } from '../../data/collaborationRequests';

export const InvestorDashboard = () => {
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState([]);

  if (!user) return null;

  const sentRequests = getRequestsFromInvestor(user.id);
  const requestedEntrepreneurIds = sentRequests.map(req => req.entrepreneurId);

  const filteredEntrepreneurs = entrepreneurs.filter((entrepreneur) => {
    const matchesSearch =
      searchQuery === '' ||
      entrepreneur.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.startupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.pitchSummary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesIndustry =
      selectedIndustries.length === 0 ||
      selectedIndustries.includes(entrepreneur.industry);

    return matchesSearch && matchesIndustry;
  });

  const industries = Array.from(new Set(entrepreneurs.map(e => e.industry)));

  const toggleIndustry = (industry) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter(i => i !== industry)
        : [...prev, industry]
    );
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Discover Startups</h1>
          <p className="text-gray-600">Find and connect with entrepreneurs</p>
        </div>

        <Link to="/entrepreneurs">
          <Button leftIcon={<PlusCircle size={18} />}>
            View All Startups
          </Button>
        </Link>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4">

        <div className="w-full md:w-2/3">
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            startAdornment={<Search size={18} />}
          />
        </div>

        <div className="w-full md:w-1/3">
          <div className="flex flex-wrap gap-2 items-center">
            <Filter size={18} />
            {industries.map((industry) => (
              <Badge
                key={industry}
                onClick={() => toggleIndustry(industry)}
                className="cursor-pointer"
              >
                {industry}
              </Badge>
            ))}
          </div>
        </div>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <Card>
          <CardBody>
            <Users size={20} />
            <p>Total Startups</p>
            <h3>{entrepreneurs.length}</h3>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <PieChart size={20} />
            <p>Industries</p>
            <h3>{industries.length}</h3>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Users size={20} />
            <p>Your Connections</p>
            <h3>
              {sentRequests.filter(req => req.status === 'accepted').length}
            </h3>
          </CardBody>
        </Card>

      </div>

      {/* Grid */}
      <Card>
        <CardHeader>
          <h2>Featured Startups</h2>
        </CardHeader>

        <CardBody>
          {filteredEntrepreneurs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEntrepreneurs.map((entrepreneur) => (
                <EntrepreneurCard
                  key={entrepreneur.id}
                  entrepreneur={entrepreneur}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p>No startups match your filters</p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedIndustries([]);
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </CardBody>
      </Card>

    </div>
  );
};