import _ from 'lodash';
import ensureArray from 'ensure-array';

export const manageTeams = async (req, res, models) => {
  const churchId = _.get(req, 'decoded.payload.churchId');
  const request = {
    id: req.params.eventId,
    churchId: churchId
  };
  const event = await models.Event.findOne({where: request});

  if(!event) {
    res.status(403).send({result: 'Forbidden', status: 'error'});
    return;
  }

  const teamsToRemove = ensureArray(_.get(req, 'body.teamsIdToRemove'));
  const teamsToAdd = ensureArray(_.get(req, 'body.teamsIdToAdd'));

  await event.removeTeams(teamsToRemove);
  await event.addTeams(teamsToAdd);

  const result = await models.Event.findOne({
    where: request, include: [{
      model: models.Team
    }]
  });

  res.send({result: result, status: 'success'});
};