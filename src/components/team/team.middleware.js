import _ from 'lodash';
import ensureArray from 'ensure-array';

export const mangeUsers = async (req, res, models) => {
  try {
    const churchId = _.get(req, 'decoded.payload.churchId');
    const request = {
      id: req.params.teamId,
      churchId: churchId
    };
    const team = await models.Team.findOne({where: request});

    if (!team) {
      res.status(403).send({result: 'Forbidden', status: 'error'});
      return;
    }
    const usersToRemove = ensureArray(_.get(req, 'body.usersIdToRemove'));
    const usersToAdd = ensureArray(_.get(req, 'body.usersIdToAdd'));

    await team.removeUsers(usersToRemove);
    await team.addUsers(usersToAdd);

    const result = await models.Team.findOne({
      where: request, include: [{
        model: models.User
      }]
    });

    res.send({result: result, status: 'success'});
  } catch (e) {
    console.log(e);
    res.status(500).send({result: e, status: 'error'});
  }
};